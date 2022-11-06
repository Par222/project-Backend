const mongoose = require("mongoose");
const { Schema } = mongoose;

const AppointmentSchema = new Schema({
  slot: {
    type: {
      time: String,
      appointment_date: Date,
    },
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  meet_code: {
    type: String,
    required: false,
  },
  doctor: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: "Doctor",
  },
  status:{
    type:String,
    required:true
  },
  des:{
    type:{
        image:String,
        text:String,

    },
    required:true
  },
  patient: 
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "User",
    },
  
});
module.exports = mongoose.model("Appoitnment", AppointmentSchema);
