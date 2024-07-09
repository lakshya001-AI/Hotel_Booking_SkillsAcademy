const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectMongoDB = require("./MongoDB/connect");
const bcrypt = require("bcrypt");
const userModel = require("./MongoDB/model");
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
    console.log(createdUser);
    return res.status(200).send({ message: "User Created Successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Error:", error });
  }
});

app.post("/loginUser", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  const existingUser = await bcrypt.compare(password, user.password);
  if (existingUser) {
    return res.status(200).send({ message: "login successfully" });
  } else {
    return res.status(400).send({message:"no password match"});
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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on the Port ${PORT}`);
});
