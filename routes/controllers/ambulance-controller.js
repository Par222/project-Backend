const HttpError = require("../errors/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const Ambulance = require("../../modals/Ambulance");
const User = require("../../modals/user");
const { default: mongoose } = require("mongoose");
class Ambulances{
 getAllAmbulance = async (req, res, next) => {
 
  let ambulance;
  try {
     ambulance= await Ambulance.find({});
  } catch {
    return next(new HttpError("Could not connect to database", 420));
  }

  if (!ambulance) {
    return next(new HttpError("Could not find any ambulance",404));
  }

  res.status(200);
  res.json({ ambulances: ambulance.map((amb) => amb.toObject({ getters: true })) });
};
createAmbulance = async (req, res, next) => {
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
   updateAmbulanceById = async (req, res, next) => {
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
   deleteAmbulanceById = async (req, res, next) => {
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
   getAmbulanceByPatientId = async (req, res, next) => {
    const pid = req.params.pid;
    let amb;
    try {
      amb = await Ambulance.findOne({request:pid,status:"Alloted"});
    } catch {
      return next(new HttpError("Could not connect to database", 422));
    }
  
    if (!amb) {
      return next(new HttpError("Could not find patient with given id", 404));
    }
  
    res.status(200);
    res.json({ ambulance: amb.toObject({ getters: true }) });
  };
}
  module.exports=Ambulances





