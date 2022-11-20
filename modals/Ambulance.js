const mongoose = require("mongoose");
const { Schema } = mongoose;

const ambulanceSchema = new Schema({
  plate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
    patient: 
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "User",
    },
    request: 
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Request",
    },
    
  location: { type: { lat: String, lng: String }, required: false },
  emergency:{type:{details:String,contact:String},required:false},
   
 
  driver: { type: { name: String, mobile: String,image: String}, required: true },
});
module.exports = mongoose.model("Ambulance", ambulanceSchema);
