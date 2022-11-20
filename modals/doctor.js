const mongoose = require("mongoose");
const { Schema } = mongoose;

const doctorSchema = new Schema({
  name: {
    type: String,
    required: "Please enter your name",
  },
  token: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  des: {
    type: String,
    required: "Please enter your description",
  },
  expertise: {
    type: String,
    required: "Please enter your expertise",
  },
  age: {
    type: Number,
    required: "Please enter your age",
  },
  fees: {
    type: Number,
    required: "Please enter your fees",
  },
  patients: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "User",
    },
  ],
  appointments: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Appointment",
    },
  ],
  image: {
    type: String,
    required: "Please enter your image",
  },
  rating: {
    type: Number,
    required: false,
  },
  certificates: {
    type: Array,
    required: false,
  },
  education: {
    type: Array,
    required: false,
  },
  contact: { type: { email: String, mobile: String }, required: false },
});
module.exports = mongoose.model("Doctor", doctorSchema);
