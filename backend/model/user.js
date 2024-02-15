const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fname:{
        type:String ,
        required:true 

    },
    lname:{
        type:String , 
        required:true 
    },
    mail:{
        type:String ,
        required:true 
    },

    password:{
        type:String ,
        required:true 
    }
})


const userModel = mongoose.model("userModel",userSchema)


module.exports = {userModel}