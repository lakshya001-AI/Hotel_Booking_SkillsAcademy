const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectMongoDB = require("./MongoDB/connect");
const bcrypt = require("bcrypt");
const userModel = require("./MongoDB/model");
const hotelModel = require("./MongoDB/hotelModel");
dotenv.config();
connectMongoDB();

app.use(express.json());
app.use(cors());

app.post("/createUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(409).send({ message: "User Already Exits" });
    }
    const createdUser = await userModel.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    return res.status(200).send({ message: "User Created Successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Error:", error });
  }
});

// app.post("/loginUser", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await userModel.findOne({ email: email });

//   if (user.email === "adminhbooking@gmail.com") {
//     return res.status(201).send({ message: "Admin login" });
//   }

//   const existingUser = await bcrypt.compare(password, user.password);
//   if (existingUser) {
//     res.status(200).json({ message: "login successfully", user:{
//       id:user._id,
//       email:user.email,
//       name:user.name
//     }});
//   } else {
//     return res.status(400).send({ message: "no password match" });
//   }
// });

// app.get("/getUsers", async (req, res) => {
//   try {
//     const users = await userModel.find();
//     console.log(users);
//   } catch (error) {
//     console.log(error);
//   }
// });

app.post("/loginUser", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.email === "adminhbooking@gmail.com") {
      return res.status(201).send({ message: "Admin login" });
    }

    const existingUser = await bcrypt.compare(password, user.password);
    if (existingUser) {
      res.status(200).json({
        message: "login successfully",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });
    } else {
      return res.status(400).send({ message: "Password does not match" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send({ message: "Server error" });
  }
});

app.post("/setHotelData", async (req, res) => {
  try {
    const {
      hotelName,
      hotelCity,
      hotelState,
      hotelAddress,
      hotelPrice,
      hotelDescription,
      imgLink,
    } = req.body;

    const existingHotel = await hotelModel.findOne({ hotelName: hotelName });

    if (existingHotel) {
      return res.status(401).send({ message: "Hotel Already Registered" });
    } else {
      const hotel = await hotelModel.create({
        hotelName: hotelName,
        hotelCity: hotelCity,
        hotelState: hotelState,
        hotelAddress: hotelAddress,
        hotelPrice: hotelPrice,
        hotelDescription: hotelDescription,
        imgLink: imgLink,
      });
      console.log(hotel);
      res.status(200).send({ message: "Hotel added to the database" });
    }
  } catch (error) {
    return res.status(501).send({ message: "Error" + error });
  }
});

// This route is used to get the data of the users

app.get("/getUsersDetails", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ message: "Error:" + error });
  }
});

app.post("/deleteUser", async (req, res) => {
  const { userName } = req.body;
  const user = await userModel.findOneAndDelete({ name: userName });
  if (user) {
    res.status(200).send({ message: "User delete Successfully" });
  }
});

// ------------------------------- Hotel Data Routes ------------------------- //

app.post("/getHotelDetails", async (req, res) => {
  try {
    const { destination, checkIn, checkOut, guest } = req.body;
    const hotels = await hotelModel.find({ hotelCity: destination });
    if (hotels.length > 0) {
      res.json(hotels); // Send all matching hotels as a JSON response
    } else {
      res.status(404).json({ message: "No hotels found for the given destination." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});


// Here we are going to insert the data into the user data the hotel that they have selected

app.post("/insertHotel", async (req, res)=>{
  try {
    const {hotelName, hotelAddress, hotelPrice , email} = req.body;
    const user = await userModel.findOne({email:email});
    if(user){

      const hotelExits = user.selectedHotels.some(item=>
        item.hotelName === hotelName && item.hotelAddress === hotelAddress && item.hotelPrice === hotelPrice
      );

      if(hotelExits){
        res.status(201).send({message:"Hotel Already Exits"});
      }else{
        user.selectedHotels.push({hotelName,hotelAddress,hotelPrice});
        await user.save();
        res.status(200).send({message:"Hotel Added"});
      }


    }else{
      res.status(404).send({message:"user not found"});
    }
    
  } catch (error) {
    res.status(500).send({message:"An error occurred",error});
  }

});

app.post("/getUserHotels", async (req, res)=>{
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
        res.status(200).json(user.selectedHotels);
    } else {
        res.status(404).send('User not found');
    }
} catch (err) {
    res.status(500).send('Server error');
}

});

app.post("/removeItemFromData", async (req, res) => {
  const { email, index } = req.body;
  console.log("Received request to remove item", { email, index }); // Add this line

  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      console.log("User found: ", user); // Add this line
      if (index >= 0 && index < user.selectedHotels.length) {
        user.selectedHotels.splice(index, 1);
        await user.save();
        console.log("Item removed and user saved"); // Add this line
        res.status(200).send("Item removed from cart");
      } else {
        console.log("Invalid item index"); // Add this line
        res.status(400).send("Invalid item index");
      }
    } else {
      console.log("User not found"); // Add this line
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Server error: ", error); // Add this line
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on the Port ${PORT}`);
});
