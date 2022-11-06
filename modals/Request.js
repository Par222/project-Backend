const mongoose = require("mongoose");
const { Schema } = mongoose;

const requestSchema = new Schema({
  status: {
    type: String,
    required: true,
  },
  patient: 
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    ambulance:{ 
        type:{location: { type: { lat: String, lng: String }, required: false },
        name:String,
        emergency:{type:{details:String,contact:String},required:false},
    }}
   
});
module.exports = mongoose.model("Request",requestSchema);