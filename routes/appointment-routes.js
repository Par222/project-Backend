const express = require("express");
const router = express.Router();
const appointmentController = require("./controllers/appointment-controller");
const { check } = require("express-validator");

router.get("/:appointmentID", appointmentController.fetchAllAppointments);

router.post("/", [
  check("patient").not().isEmpty(),
  check("doctor").not().isEmpty(),
  check("slot.time").not().isEmpty(),
  check("slot.date").not().isEmpty(),
  check("mode").not().isEmpty(),
  check("illness").not().isEmpty()
], appointmentController.createAppointment);

router.patch("/:appointmentID", [
  check("patient").not().isEmpty(),
  check("doctor").not().isEmpty(),
  check("slot.time").not().isEmpty(),
  check("slot.date").not().isEmpty(),
  check("mode").not().isEmpty(),
  check("illness").not().isEmpty()
], appointmentController.updateAppointment);

router.delete("/:appointmentID", appointmentController.deleteAppointment);

router.get("/", appointmentController.fetchAllAppointments);

module.exports = router;
