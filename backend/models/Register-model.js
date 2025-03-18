const mongoose=require('mongoose')
const Schema=mongoose.Schema  
const resgisterSchema=new Schema({
    username:{
        type:String,
        required:true
    
    },

    email:
    {
        type:String,
        required:true
    },
    password:
    {
        type:Number,
        required:true
    }
},)

module.exports=mongoose.model('register',resgisterSchema)