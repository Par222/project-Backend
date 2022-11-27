const { Appointment } = require("../../modals/appointment");
const HttpError = require("../errors/http-error");
const User = require("../../modals/user");
const Doctor = require("../../modals/doctor");


const fetchPatientById = async (patientID) => {
  console.log("patient", patientID);
  let user;
  try {
    user = await User.findById(patientID);
  } catch (error) {
    console.log(error);
  }

  if (!user) {
    return {};
  }
  return user.toObject({ getters: true });
};

const fetchDoctorById = async (docId) => {
  let doctor;
  try {
    doctor = await Doctor.findById(docId);
  } catch {
    console.log(error);
  }

  if (!doctor) {
    return {};
  }

  return doctor.toObject({ getters: true });
};

const fetchAllAppointments = async (req, res, next) => {
  let appointments;
  try {
    appointments = await Appointment.find({});
  } catch (error) {
    throw new HttpError("Error fetching appointments!", 422);
  }
  if (!appointments) {
    throw new HttpError("No appointments found!", 500);
  }

  res.status(200),
    res.json({
      appointments: appointments.map((a) => a.toObject({ getters: true })),
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
    throw new HttpError("No appointment found!", 500);
  }
  const patientData = await fetchPatientById(appointment?.patient);
  const doctorData = await fetchDoctorById(appointment?.doctor);
  res.status(200);
  res.json({
    appointment: appointment.toObject({ getters: true }),
    patientData: patientData,
    doctorData: doctorData,
  });
};
const updateAppointment = async (req, res, next) => {
  const appointmentID = req.params.appointmentID;
  const newAppointment = req.body.appointment;
  let updatedAppointment;
  try {
    updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentID,
      newAppointment,
      { new: true }
    );
  } catch (error) {
    console.log(error);
    throw new HttpError("Error updating the required appointment!", 422);
  }
  if (!updatedAppointment) {
    throw new HttpError("No appointment found!", 500);
  }
  const patientData = await fetchPatientById(updatedAppointment?.patient);
  const doctorData = await fetchDoctorById(updatedAppointment?.doctor);
  res.status(200);
  res.json({
    appointment: updatedAppointment.toObject({ getters: true }),
    patientData: patientData,
    doctorData: doctorData,
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
    throw new HttpError("No appointment found!", 500);
  }
  const patientData = await fetchPatientById(deletedAppointment?.patient);
  const doctorData = await fetchDoctorById(deletedAppointment?.doctor);
  res.status(200);
  res.json({
    appointment: deletedAppointment.toObject({ getters: true }),
    patientData: patientData,
    doctorData: doctorData,
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
    console.log(error);
    throw new HttpError("Error requesting appointment!", 422);
  }
  if (!request) {
    throw new HttpError("Appointment could not be requested", 500);
  }
  const patientData = await fetchPatientById(request?.patient);
  const doctorData = await fetchDoctorById(request?.doctor);
  res.status(201);
  res.json({
    appointment: request.toObject({ getters: true }),
    patientData: patientData,
    doctorData: doctorData,
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

const fetchUpcomingAppointmentsByDoctor = async (req, res, next) => {
  const doctorID = req.params.doctorID;
  const currentDate = new Date();
  let appointments;
  try {
    appointments = await Appointment.find(
      { doctor: doctorID },
      { slot: { date: { gte: currentDate } } }
    );
  } catch (error) {
    throw new HttpError("Error fetching appointments!", 422);
  }
  if (!appointments) {
    throw new HttpError("No appointments found!", 500);
  }
  const dataToBeReturned = [];
  for (let appointment of appointments) {
    const patientData = await fetchPatientById(appointment?.patient);
    const doctorData = await fetchDoctorById(appointment?.doctor);
    const data = {
      appointment: appointment.toObject({ getters: true }),
      patientData: patientData,
      doctorData: doctorData,
    };
    dataToBeReturned.push(data);
  }

  res.status(200);
  res.json({
    appointments: dataToBeReturned,
  });
};

const fetchAppointmentsByDoctor = async (req, res, next) => {
  const doctorID = req.params.doctorID;
  console.log(doctorID);
  let appointments;
  try {
    appointments = await Appointment.find({
      doctor: doctorID,
    });
  } catch (error) {
    throw new HttpError("Error fetching appointments!", 422);
  }
  if (!appointments) {
    throw new HttpError("No appointments found!", 500);
  }
  console.log(appointments);
  // const dataToBeReturned = appointments.map(async (appointment) => {
  //   const patientData = await fetchPatientById(appointment?.patient);
  //   console.log("pd", patientData)
  //   const doctorData = await fetchDoctorById(appointment?.doctor);
  //   console.log("dd", doctorData)

  //   return {
  //     appointment: appointment.toObject({ getters: true }),
  //     patientData: patientData,
  //     doctorData: doctorData,
  //   };
  // });

  const dataToBeReturned = [];
  for (let appointment of appointments) {
    const patientData = await fetchPatientById(appointment?.patient);
    const doctorData = await fetchDoctorById(appointment?.doctor);
    const data = {
      appointment: appointment.toObject({ getters: true }),
      patientData: patientData,
      doctorData: doctorData,
    };
    dataToBeReturned.push(data);
  }

  res.status(200);
  res.json({
    appointments: dataToBeReturned,
  });
};

const fetchAppointmentsByPatient = async (req, res, next) => {
  const patientID = req.params.patientID;
  let appointments;
  try {
    appointments = await Appointment.find({ patient: patientID });
  } catch (error) {
    throw new HttpError("Error fetching appointments!", 422);
  }
  if (!appointments) {
    throw new HttpError("No appointments found!", 500);
  }

  res.status(200),
    res.json({
      appointments: appointments.map((a) => a.toObject({ getters: true })),
    });
};

const fetchUpcomingAppointmentsByPatient = async (req, res, next) => {
  const patientID = req.params.patientID;
  const currentDate = new Date();
  let appointments;
  try {
    appointments = await Appointment.find(
      {
        patient: patientID,
      },
      { slot: { date: { gte: currentDate } } }
    );
  } catch (error) {
    throw new HttpError("Error fetching appointments!", 422);
  }
  if (!appointments) {
    throw new HttpError("No appointments found!", 500);
  }
  const dataToBeReturned = [];
  for (let appointment of appointments) {
    const patientData = await fetchPatientById(appointment?.patient);
    const doctorData = await fetchDoctorById(appointment?.doctor);
    const data = {
      appointment: appointment.toObject({ getters: true }),
      patientData: patientData,
      doctorData: doctorData,
    };
    dataToBeReturned.push(data);
  }

  res.status(200),
    res.json({
      appointments: dataToBeReturned,
    });
};

module.exports.createAppointment = createAppointment;
module.exports.fetchAllAppointments = fetchAllAppointments;
module.exports.fetchAppointmentByID = fetchAppointmentByID;
module.exports.updateAppointment = updateAppointment;
module.exports.deleteAppointment = deleteAppointment;
module.exports.fetchUpcomingAppointmentsByDoctor =
  fetchUpcomingAppointmentsByDoctor;
module.exports.fetchAppointmentsByDoctor = fetchAppointmentsByDoctor;
module.exports.fetchAppointmentsByPatient = fetchAppointmentsByPatient;
module.exports.fetchUpcomingAppointmentsByPatient =
  fetchUpcomingAppointmentsByPatient;
