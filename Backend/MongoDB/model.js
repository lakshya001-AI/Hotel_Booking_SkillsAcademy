const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  selectedHotels: [
    {
      hotelName:String,
      hotelAddress:String,
      hotelPrice:Number
    }
  ]
});

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
