const HttpError=require('../errors/http-error')
const {v4: uuidv4}=require('uuid')
const {validationResult}=require('express-validator')
const User=require('../../modals/user')

class Patient{
 showUser=async(req,res,next)=>{
    let user;
    try{    
    user=await User.find({},'-password')
    }
    catch{
        return next(new HttpError('Could not connect to databse'),422)
    }
    if(user.length===0 || !user)
    {
        return next(new HttpError('No user found'),422)
    }

    res.status(200)
    res.json({user:user.map((u)=>u.toObject({getters:true}))})
  
   
}
 createUser=async(req,res,next)=>{
    const {name,email,password,token}=req.body
    const error=validationResult(req)
    if(!error.isEmpty())
    {
        throw new HttpError("Invalid details provided",501)
    }
    let user;
    try{    
    user=await User.findOne({email:email})
    }
    catch{
        return next(new HttpError('Could not connect to databse'),422)
    }
    if(user)
    {
        return next(new HttpError('Account exists,Login instead'),501)
    }
    
        const Myuser= new User({
            name,
            email,
            password,
            token,
            image:"",
            contact:"",
            doctors:[],
            ambulance:[],
            reports:[]

        })
        console.log(Myuser)
   
     Myuser.save(function(err,result){
        if (err){
            console.log(err);
        }
        else{
            console.log(result)
        }
    });

    res.status(201);
    res.json({user:Myuser.toObject({getters:true})})
}
 loginUser=async(req,res,next)=>{
    const {email,password}=req.body
    const error=validationResult(req)
    if(!error.isEmpty())
    {
        throw new HttpError("Invalid details provided",501)
    }
    let user;
    try{    
    user=await User.findOne({email:email})
    }
    catch{
        return next(new HttpError('Could not connect to databse'),422)
    }
    if(!user || user.password!==password)
    {
        return next(new HttpError('Invalid passowrd or account does not exsist'),501)

    }
    res.status(201);
    res.json({user:user.toObject({getters:true})})
   
}
 getUserById = async (req, res, next) => {
    const uid= req.params.uid;
    let user;
    try {
      user = await User.findById(uid)
    } catch {
      return next(new HttpError("Could not connect to database", 422));
    }
  
    if (!user) {
      return next(new HttpError("Could not find user with given id", 404));
    }
  
    res.status(200);
    res.json({ user: user.toObject({ getters: true }) });
  };
 updateUserById = async (req, res, next) => {
    const uid = req.params.uid;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      throw new HttpError("Invalid details provided", 501);
    }
  
    let user;
    try {
      user = await User.findByIdAndUpdate(uid, req.body,{new:true});
    } catch {
      return next(new HttpError("Could not connect to database", 422));
    }
    if (!user) {
      throw new HttpError("Could not find doctor for given id", 404);
    }
  
    res.status(200);
    res.json({ user: user.toObject({ getters: true }) });
  };
}
module.exports=Patient