const mongoose = require("mongoose") ; 
const userSchema = require("./user")
const user = userSchema.userModel

const accountSchema =new  mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    } , 
    balance: Number , 
})



const accountModel = mongoose.model("accountModel" , accountSchema);

module.exports = {accountModel}