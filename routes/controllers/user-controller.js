const HttpError=require('../errors/http-error')
const {v4: uuidv4}=require('uuid')
const {validationResult}=require('express-validator')
const User=require('../../modals/user')


const showUser=async(req,res,next)=>{
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
const createUser=async(req,res,next)=>{
    const {name,email,password,image}=req.body
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
            image,
            doctors:[]
        })
        console.log(Myuser)
   try{
    const result=await Myuser.save()
   }
   catch{
    return next(new HttpError('Sign-up failed'),501)
   }
    res.status(201);
    res.json({user:Myuser.toObject({getters:true})})
}
const loginUser=async(req,res,next)=>{
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
    res.json({message:"Logged-IN"})
   
}
exports.showUser=showUser
exports.createUser=createUser
exports.loginUser=loginUser