const mongoose = require("mongoose");

const UserTypeSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    user_type: {
      type: String,
      required: true,
    },
    patientID: {
      type: mongoose.Types.ObjectId,
      ref: "Patient"
    },
    doctorID: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor"
    }
  }
);

module.exports = mongoose.model("UserType", UserTypeSchema);