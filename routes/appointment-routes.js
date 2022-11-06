const express = require("express");
const router = express.Router();
const appointmentController = require("./controllers/appointment-controller");
const { check } = require("express-validator");

router.get("/:appointmentID", appointmentController.fetchAllAppointments);

router.post("/", [
  check("patient").not().isEmpty(),
  check("doctor").not().isEmpty(),
  check("slot.start_time").not().isEmpty(),
  check("slot.date").not().isEmpty(),
  check("mode").not().isEmpty(),
  check("illness").not().isEmpty()
], appointmentController.createAppointment);

router.patch("/:appointmentID", [
  check("patient").not().isEmpty(),
  check("doctor").not().isEmpty(),
  check("slot.start_time").not().isEmpty(),
  check("slot.date").not().isEmpty(),
  check("mode").not().isEmpty(),
  check("illness").not().isEmpty()
], appointmentController.updateAppointment);

router.delete("/:appointmentID", appointmentController.deleteAppointment);

router.get("/doctor-upcoming-appointment-list/:doctorID", appointmentController.fetchUpcomingAppointmentsByDoctor);

router.get("/doctor-appointment-list/:doctorID", appointmentController.fetchAppointmentsByDoctor);

router.get("/patient-upcoming-appointment-list/:patientID", appointmentController.fetchUpcomingAppointmentsByPatient);

router.get("/patient-appointment-list/:patientID", appointmentController.fetchAppointmentsByPatient);

router.get("/", appointmentController.fetchAllAppointments);

module.exports = router;
