const mongoose = require("mongoose") ;

const connectDatabase = ()=>{
    mongoose.connect("mongodb://localhost:27017/paytm").then(()=>{
        console.log("mongodb is connected")
    })
}

module.exports = connectDatabase ; 