const HttpError = require("../errors/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const Ambulance = require("../../modals/ambulance");
const User = require("../../modals/user");
const { default: mongoose } = require("mongoose");
const getAllAmbulance = async (req, res, next) => {
 
  let ambulance;
  try {
     ambulance= await Ambulance.find({});
  } catch {
    return next(new HttpError("Could not connect to database", 422));
  }

  if (!ambulance) {
    return next(new HttpError("Could not find any ambulance", 501));
  }

  res.status(200);
  res.json({ ambulances: ambulance.map((amb) => amb.toObject({ getters: true })) });
};
const createAmbulance = async (req, res, next) => {
    const { plate,driver,status } = req.body;
    const error = validationResult(req);
    console.log(req.body);
    if (!error.isEmpty()) {
      return next(new HttpError("Invalid details provided", 501));
    }
  
    const ambulance = new Ambulance({
      status,
      plate,
      driver,
      patient: [],
      location:{},
      emergency:{}

    });
    let amb;
    try {
      amb = await ambulance.save();
    } catch (err) {
      return next (new HttpError("Could not connect to database",501))
    }
    if (!amb) {
      return next(new HttpError("Invalid user", 404));
    }
  
    res.status(201);
    res.json({ ambulance: ambulance.toObject({ getters: true }) });
  };
  const updateAmbulanceById = async (req, res, next) => {
    const ambId = req.params.pid;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      throw new HttpError("Invalid details provided", 501);
    }
  
    let ambulance;
    try {
      ambulance = await Ambulance.findByIdAndUpdate(ambId, req.body,{new:true});
    } catch {
      return next(new HttpError("Could not connect to database", 422));
    }
    if (!ambulance) {
      throw new HttpError("Could not find doctor for given id", 404);
    }
  
    res.status(200);
    res.json({ ambulances: ambulance.toObject({ getters: true }) });
  };
  const deleteAmbulanceById = async (req, res, next) => {
    const ambId = req.params.pid;
    let ambulance;
    try {
      ambulance = await Ambulance.findByIdAndDelete(ambId);
    } catch {
      return next(new HttpError("Could not connect  to database"), 422);
    }
    if (!ambulance) {
      return next(new HttpError("Could not find a ambulance for given id"), 404);
    }
  
    res.status(200);
    res.json({ ambulance: ambulance.toObject({ getters: true }) });
  };

  


exports.getAllAmbulance = getAllAmbulance;
exports.deleteAmbulanceById=deleteAmbulanceById
exports.updateAmbulanceById=updateAmbulanceById
exports.createAmbulance=createAmbulance


