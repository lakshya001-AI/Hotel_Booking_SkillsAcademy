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

app.post("/loginUser", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });

  if (user.email === "adminhbooking@gmail.com") {
    return res.status(201).send({ message: "Admin login" });
  }
  
  const existingUser = await bcrypt.compare(password, user.password);
  if (existingUser) {
    return res.status(200).send({ message: "login successfully" });
  } else {
    return res.status(400).send({ message: "no password match" });
  }
});

// app.get("/getUsers", async (req, res) => {
//   try {
//     const users = await userModel.find();
//     console.log(users);
//   } catch (error) {
//     console.log(error);
//   }
// });

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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on the Port ${PORT}`);
});
