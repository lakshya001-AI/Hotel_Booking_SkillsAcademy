const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectMongoDB = require("./MongoDB/connect");
const userModel = require("./MongoDB/model");
dotenv.config();
connectMongoDB();

app.use(express.json());
app.use(cors());

app.post("/createUser", (req, res) => {
    
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on the Port ${PORT}`);
});
