const mongoose = require("mongoose");
const { Schema } = mongoose;

const ambulanceSchema = new Schema({
  plate: {
    type: String,
    required: "Please enter your number plate",
  },
  status: {
    type: String,
    required: "Please enter your status",
  },
  patients: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "User",
    },
  ],
  location: { type: { lat: String, lng: String }, required: false },
 
  driver: { type: { name: String, mobile: String }, required: true },
});
module.exports = mongoose.model("Ambulance", ambulanceSchema);
