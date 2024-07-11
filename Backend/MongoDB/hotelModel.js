const mongoose = require("mongoose");

const hotelDataSchema = mongoose.Schema({
  hotelName: { type: String, required: true },
  hotelCity: { type: String, required: true },
  hotelState: { type: String, required: true },
  hotelAddress: { type: String, required: true },
  hotelPrice: { type: Number, required: true },
  hotelDescription: { type: String, required: true },
  fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'uploads.files', required: true }
});

const hotelModel = mongoose.model("hotelModel", hotelDataSchema);
module.exports = hotelModel;
