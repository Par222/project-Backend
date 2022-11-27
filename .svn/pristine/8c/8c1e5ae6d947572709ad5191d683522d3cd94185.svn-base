const HttpError = require("../errors/http-error");
const { validationResult } = require("express-validator");
const Doctor = require("../../modals/doctor");

class Doctors {
  getDoctorById = async (req, res, next) => {
    const docId = req.params.pid;
    let doctor;
    try {
      doctor = await Doctor.findById(docId);
    } catch {
      return next(new HttpError("Could not connect to database", 422));
    }

    if (!doctor) {
      return next(new HttpError("Could not find doctor with given id", 404));
    }

    res.status(200);
    res.json({ doctor: doctor.toObject({ getters: true }) });
  };
  searchDoctor = async (req, res, next) => {
    let name = req.params.name;

    let doctor;
    try {
      doctor = await Doctor.find({ name: { $regex: name } });
    } catch {
      return next(new HttpError("Database disconnected"), 422);
    }
    if (!doctor) {
      return next(new HttpError("No user found"), 422);
    }
    res.status(200);
    res.json({ doctors: doctor.map((d) => d.toObject({ getters: true })) });
  };
  getAllDoctor = async (req, res, next) => {
    let doctor;
    try {
      doctor = await Doctor.find({});
    } catch {
      return next(new HttpError("Database not found"), 422);
    }
    if (doctor.length === 0 || !doctor) {
      return next(new HttpError("No user found"), 422);
    }

    res.status(200);
    res.json({ doctors: doctor.map((d) => d.toObject({ getters: true })) });
  };

  createDoctor = async (req, res, next) => {
    const { name, des, age, expertise, image, fees } = req.body;
    const error = validationResult(req);
    console.log(req.body);
    if (!error.isEmpty()) {
      return next(new HttpError("Invalid details provided", 501));
    }

    const doctor = new Doctor({
      name,
      des,
      age,
      expertise,
      image,
      fees,
      patients: [],
    });
    let user;
    try {
      user = await doctor.save();
    } catch (err) {
      res.send(err.message);
      // return next (new HttpError("Could not connect to database",501))
    }
    if (!user) {
      return next(new HttpError("Invalid user", 404));
    }
    console.log(doctor);

    res.status(201);
    res.json({ doctor: doctor.toObject({ getters: true }) });
  };

  registerDoctor = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      throw new HttpError("Invalid details provided", 501);
    }
    let doctor;
    try {
      doctor = await Doctor.findOne({ email: req.body.email });
    } catch {
      return next(new HttpError("Could not connect to databse"), 422);
    }
    if (doctor) {
      return next(new HttpError("Account exists,Login instead"), 501);
    }

    const newDoctor = new Doctor(req.body);

    try {
      console.log(req.body);
      doctor = await newDoctor.save();
    } catch (error) {
      throw new HttpError("Error creating doctor", 422);
    }
    if (doctor) {
      res.status(201);
      res.json({ doctor: doctor.toObject({ getters: true }) });
    }
  };

  loginDoctor = async (req, res, next) => {
    const { email, password } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      throw new HttpError("Invalid details provided", 501);
    }
    let doctor;
    try {
      doctor = await Doctor.findOne({ email: email });
    } catch {
      return next(new HttpError("Could not connect to databse"), 422);
    }
    if (!doctor || doctor.password !== password) {
      return next(
        new HttpError("Invalid passowrd or account does not exsist"),
        501
      );
    }
    res.status(201);
    res.json({ doctor: doctor.toObject({ getters: true }) });
  };
  updateDoctorById = async (req, res, next) => {
    const { name, des, age, expertise, image, fees } = req.body;
    const docId = req.params.pid;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      throw new HttpError("Invalid details provided", 501);
    }

    let doctor;
    try {
      doctor = await Doctor.findByIdAndUpdate(docId, req.body, { new: true });
    } catch {
      return next(new HttpError("Could not connect to database", 422));
    }
    if (!doctor) {
      throw new HttpError("Could not find doctor for given id", 404);
    }

    res.status(200);
    res.json({ doctor: doctor.toObject({ getters: true }) });
  };
  deleteDoctorById = async (req, res, next) => {
    const docId = req.params.pid;
    let doctor;
    try {
      doctor = await Doctor.findByIdAndDelete(docId);
    } catch {
      return next(new HttpError("Could not connect  to database"), 422);
    }
    if (!doctor) {
      return next(new HttpError("Could not find a doctor for given id"), 404);
    }

    res.status(200);
    res.json({ doctor: doctor.toObject({ getters: true }) });
  };
}
module.exports = Doctors;
