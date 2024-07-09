const mongoose = require("mongoose");

async function connectMongoDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/hotelBookingData");
    console.log("Database is Connected");
  } catch (error) {
    console.log("Error:" + error);
  }
}

module.exports = connectMongoDB;
