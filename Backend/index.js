const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectMongoDB = require("./MongoDB/connect");
const bcrypt = require("bcrypt");
const userModel = require("./MongoDB/model");
const hotelModel = require("./MongoDB/hotelModel");
const methodOverride = require("method-override");
const multer = require("multer");
const mongoose = require("mongoose");
const {GridFsStorage} = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
dotenv.config();
connectMongoDB();

app.use(express.json());
app.use(cors());
app.use(methodOverride('_method'));

// Initialize GridFS
let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});


const storage = new GridFsStorage({
  url:process.env.MONGO_URI,
  file:(req, file)=>{
    return {
      filename: file.originalname,
      bucketName: 'uploads'
    };
  }
});

const upload = multer({ storage });



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

app.get("/getUsers", async (req, res) => {
  try {
    const users = await userModel.find();
    console.log(users);
  } catch (error) {
    console.log(error);
  }
});

// This route is used to set the data into the database 
app.post("/setHotelData",upload.single("selectedFile"),async (req, res) => {
  try {
    const {
      hotelName,
      hotelCity,
      hotelState,
      hotelAddress,
      hotelPrice,
      hotelDescription,
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
        fileId: req.file.id,
      });
      console.log(hotel);
      res.status(200).send({message:"Hotel added to the database"});
    }
  } catch (error) {
    return res.status(501).send({message:"Error" + error});
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on the Port ${PORT}`);
});
