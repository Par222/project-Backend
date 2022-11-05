const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  doctors: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Doctor",
    },
  ],
  appointments: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Appointment",
    },
  ],
  reports: [
    {
      type: { medicines: Array, createdBy: mongoose.Types.ObjectId },
      required: false,
      ref: "Doctor",
    },
  ],
  ambulance: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: "Ambulance",
  },
  request_ambulance: {
    type: {
      mobile: String,
      emergency: String,
      location: {
        type: { lat: String, lng: String },
        required: true,
      },
    }
  },
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
