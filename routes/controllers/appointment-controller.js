const { Appointment } = require("../../modals/appointment");
const HttpError = require("../errors/http-error");

const fetchAllAppointments = async (req, res, next) => {
  let appointments;
  try {
    appointments = await Appointment.find({});
  } catch (error) {
    throw new HttpError("Error fetching appointments!", 422);
  }
  if (!appointments) {
    throw new HttpError("No appointments found!", 422);
  }
  res.status(200),
    res.json({
      appointments: appointments.map((appointment) => {
        appointment.toObject({ getters: true });
      }),
    });
};

const fetchAppointmentByID = async (req, res, next) => {
  const appointmentID = req.params.appointmentID;
  let appointment;
  try {
    appointment = await Appointment.findById(appointmentID);
  } catch (error) {
    throw new HttpError("Error fetching the required appointment!", 422);
  }
  if (!appointment) {
    throw new HttpError("No appointment found!", 422);
  }
  res.status(200);
  res.json({
    appointment: appointment.toObject({ getters: true }),
  });
};

const updateAppointment = async (req, res, next) => {
  const appointmentID = req.params.appointmentID;
  const newAppointment = req.body.appointment;
  let updatedAppointment;
  try {
    updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentID,
      _omit(newAppointment, _id),
      { new: true }
    );
  } catch (error) {
    throw new HttpError("Error updating the required appointment!", 422);
  }
  if (!updatedAppointment) {
    throw new HttpError("No appointment found!", 422);
  }
  res.status(200);
  res.json({
    appointment: updatedAppointment.toObject({ getters: true }),
  });
};

const deleteAppointment = async (req, res, next) => {
  const appointmentID = req.params.appointmentID;
  let deletedAppointment;
  try {
    deletedAppointment = await Appointment.findByIdAndDelete(appointmentID);
  } catch (error) {
    throw new HttpError("Error deleting required appointment!", 422);
  }
  if (!deletedAppointment) {
    throw new HttpError("No appointment found!", 422);
  }
  res.status(200);
  res.json({
    appointment: deletedAppointment.toObject({ getters: true }),
  });
};

const createAppointment = async (req, res, next) => {
  // const appointmentRequest = new AppointmentRequest(
  //   req.body.appointmentRequest
  // );
  // let request;
  // try {
  //   request = await appointmentRequest.save();
  // } catch (error) {
  //   throw new HttpError("Error requesting appointment!", 422);
  // }
  // if (!request) {
  //   throw new HttpError("Appointment could not be requested", 422);
  // }
  // res.status(201);
  // res.json({
  //   appointmentRequest: request.toObject({ getters: true }),
  // });

  const appointmentRequest = new Appointment(req.body.appointment);
  let request;
  try {
    request = await appointmentRequest.save();
  } catch (error) {
    throw new HttpError("Error requesting appointment!", 422);
  }
  if (!request) {
    throw new HttpError("Appointment could not be requested", 422);
  }
  res.status(201);
  res.json({
    appointmentRequest: request.toObject({ getters: true }),
  });
};

// const confirmAppointmentRequest = async (req, res, next) => {
//   const confirmedRequest = req.body.appointment;
//   let newAppointment;
//   try {
//     newAppointment = await Appointment.findByIdAndUpdate(
//       confirmedRequest._id,
//       _omit(confirmedRequest, _id),
//       { new: true }
//     );
//   } catch (error) {
//     throw new HttpError("Error confirming an appointment!", 422);
//   }
//   if (!newAppointment) {
//     throw new HttpError("Appointment could not be confirmed!", 422);
//   }
//   res.status(200);
//   res.json({
//     appointment: newAppointment.toObject({ getters: true }),
//   });
// };

// const declineAppointmentRequest

module.exports.createAppointment = createAppointment;
module.exports.fetchAllAppointments = fetchAllAppointments;
module.exports.fetchAppointmentByID = fetchAppointmentByID;
module.exports.updateAppointment = updateAppointment;
module.exports.deleteAppointment = deleteAppointment;