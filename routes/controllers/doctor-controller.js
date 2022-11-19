const HttpError = require("../errors/http-error");
const { validationResult } = require("express-validator");
const Doctor = require("../../modals/doctor");
const User = require("../../modals/user");
const { default: mongoose } = require("mongoose");
const testController =require("../../services/utils")
class Doctors{
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
  let name=req.params.name
  
  let doctor;
  try {
    doctor = await Doctor.find({name:{$regex:name}});
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
  let AllDoctors;
  try{
  AllDoctors=await Doctor.find({})
  }catch(err){
    console.log(err)
  }
  const doctor = {
    name,
    des,
    age,
    expertise,
    image,
    fees,
    patients: [],
  };
  testController.createDoctor(AllDoctors,doctor)
 
  await Doctor.deleteMany({})
  try {
   await Doctor.insertMany(AllDoctors)
  } catch (err) {
    res.send(err.message);
    // return next (new HttpError("Could not connect to database",501))
  }
 
  console.log(doctor);

  res.status(201);
  res.json({ doctor: "Doctor Added" });
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
    doctor = await Doctor.findByIdAndUpdate(docId, req.body,{new:true});
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
  let AllDoctors;
  try{
  AllDoctors=await Doctor.find({})
  }catch(err){
    console.log(err)
  }
  testController.deleteDoctor(AllDoctors,docId)
  let doctor;
  try {
    await Doctor.deleteMany({});
  } catch {
    return next(new HttpError("Could not connect  to database"), 422);
  }
   await Doctor.insertMany(AllDoctors)
  

  res.status(200);
  res.json({ doctor: doctor.toObject({ getters: true }) });
};
}
module.exports=Doctors
