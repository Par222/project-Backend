const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    slot: {
      type: {
        start_time: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
      },
    },
    mode: {
      type: String,
      required: true,
    },
    meet_link: {
      type: String,
    },
    illness: {
      type: String,
      required: true,
    },
    description: {
      type: {
        text: {
          type: String,
        },
        media: {
          type: String,
        },
      },
    },
    payment_status: {
      type: String,
      default: "Pending",
    },
    additional_notes: {
      type: String,
    },
    prescription: {
      text: {
        type: String,
      },
      media: {
        type: String,
      },
    },
    approved_by: {
      type: {
        doctor: {
          type: String,
          default: "Pending",
        },
      },
    },
  }
  // { _id: false }
);

// const AppointmentRequestSchema = new mongoose.Schema({
//   patient: {
//     type: mongoose.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   doctor: {
//     type: mongoose.Types.ObjectId,
//     ref: "Doctor",
//     required: true,
//   },
//   mode: {
//     type: String,
//     required: true,
//   },
//   slot: {
//     type: {
//       time: {
//         type: String,
//         required: true,
//       },
//       date: {
//         type: Date,
//         required: true,
//       },
//     },
//   },
//   illness: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: {
//       text: {
//         type: String,
//       },
//       media: {
//         type: String,
//       },
//     },
//   },
//   approved_by: {
//     type: {
//       doctor: {
//         type: String,
//         default: "Pending"
//       }
//     }
//   }
// });

module.exports.Appointment = mongoose.Model("Appointment", AppointmentSchema);
// module.exports.AppointmentRequest = mongoose.Model(
//   "AppointmentRequest",
//   AppointmentRequestSchema
// );