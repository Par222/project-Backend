const HttpError = require("../errors/http-error");
const Request = require("../../modals/Request");

const createReq = async (req, res, next) => {
    const { patient,ambulance,status} = req.body;
    console.log(req.body);
  
    const patientReq = new Request({
        patient,
        status,
        ambulance

    });
    let request;
    try {
      request = await patientReq.save();
    } catch (err) {
      return next (new HttpError(err,501))
    }
    if (!request) {
      return next(new HttpError("Invalid request", 404));
    }
  
    res.status(201);
    res.json({ request: patientReq.toObject({ getters: true }) });
  };
  const updateReqById = async (req, res, next) => {
    const reqId = req.params.pid;
    let request;
    try {
      request = await Request.findByIdAndUpdate(reqId,req.body,{new:true})
    } catch {
      return next(new HttpError("Could not connect to database", 422));
    }
    if (!request) {
      throw new HttpError("Could not find patient request for given id", 404);
    }
  
    res.status(200);
    res.json({ request: request.toObject({ getters: true }) });
  };
  const getPendingRequest = async (req, res, next) => {
 
    let request;
    try {
       request= await Request.find({status:"Pending"});
    } catch {
      return next(new HttpError("Could not connect to database", 422));
    }
  
    if (!request) {
      return next(new HttpError("Could not find any pending request", 501));
    }
  
    res.status(200);
    res.json({ requests: request.map((r) => r.toObject({ getters: true })) });
  };
  const getReqByPatientId = async (req, res, next) => {
    const pid = req.params.pid;
    let request;
    try {
      request = await Request.find({patient:pid});
    } catch {
      return next(new HttpError("Could not connect to database", 422));
    }
  
    if (!request) {
      return next(new HttpError("Could not find doctor with given id", 404));
    }
  
    res.status(200);
    res.json({ requests: request.map((r) => r.toObject({ getters: true })) });
   
  };

 
 


exports.updateReqById=updateReqById
exports.createReq=createReq
exports.getPendingRequest=getPendingRequest
exports.getReqByPatientId=getReqByPatientId
