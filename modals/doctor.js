const mongoose=require('mongoose')
const {Schema}=mongoose

const doctorSchema= new Schema(
    {
        name:{
            type:String,
            required:true
        },
        des:{
            type:String,
            required:true
        },
        expertise:{
            type:String,
            required:true
        },
        age:{
            type:String,
            required:true
        },
        creator:{
            type:mongoose.Types.ObjectId,
            required:true,
            ref:"User"
        },
        image:{
            type:String,
            required:true
        }
    }
)
module.exports=mongoose.model('Doctor',doctorSchema)