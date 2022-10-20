const express=require('express')
const doctorRoutes=require('./routes/doctor-routes')
const userRoutes=require('./routes/user-routes')
const bodyParser=require('body-parser')
const app=express();
const mongoose=require('mongoose')
app.use(bodyParser.json())
app.use('/api/doctors',doctorRoutes)
app.use('/api/patient',userRoutes)
app.use((error,req,res,next)=>{

    if(res.headerSent)
    {
         return next(error)
    }
    res.status(error.code || 500)
    res.json({message:error.message || "Invalid request"})

})
mongoose.connect('mongodb+srv://parasMehta:para2222@cluster0.aaspp2v.mongodb.net/hospital?retryWrites=true&w=majority').then(()=>{
    app.listen(5000) 
}).catch((error)=>{
    console.log(error)

})
