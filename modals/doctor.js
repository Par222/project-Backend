const mongoose=require('mongoose')
const {Schema}=mongoose

const doctorSchema= new Schema(
    {
        name:{
            type:String,
            required:'Please enter your name'
        },
        des:{
            type:String,
            required:'Please enter your description'
        },
        expertise:{
            type:String,
            required:'Please enter your expertise'
        },
        age:{
            type:Number,
            required:'Please enter your age'
        },
        fees:{
            type:Number,
            required:'Please enter your fees'
        },
        patients:{
            type:Array,
            required:false,
            ref:"User"
        },
        image:{
            type:String,
            required:'Please enter your image'
        }
    }
)
module.exports=mongoose.model('Doctor',doctorSchema)