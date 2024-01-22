const mongoose=require('mongoose');
const validator=require('validator')
const bcrypt=require('bcryptjs')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        lowecase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email is not correct")
            }
        },
        unique:true,
    },
    id:{
        type:Number,
        required:true,
    },
    designation:{
        type:String,
        required:true,
    }
})

module.exports=mongoose.model('users',userSchema)

