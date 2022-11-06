const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  token:{
    type:String,
    required:true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  contact: {
    type: String,
    required: false,
  },
  appointments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Appointment",
    }
    
  ],
  reports: [
    {
      type: { medicines: Array, createdBy: mongoose.Types.ObjectId },
      ref: "Doctor",
    },
  ],
  ambulance: [{
    type: mongoose.Types.ObjectId,
    ref: "Ambulance",
  }]


});
module.exports = mongoose.model("User", userSchema);
