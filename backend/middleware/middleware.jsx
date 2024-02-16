const {userModel} = require("../model/user")
const jwt = require("jsonwebtoken")
const zod = require("zod") ; 



const authorization = async (req , res , next)=>{

    const token_bearer = req.headers.authorization
    if(!token_bearer || !token_bearer.startsWith("Bearer ")) {
        return res.status(403).json({}) ; 
    }

    const token = token_bearer.split(' ')[1] ; 
    console.log(token)
    const secret = "mynameismayank"
    
    const tokenValues  = jwt.verify(token , secret )



    const userId = tokenValues.userId ; 

    console.log(userModel)

    const users = userModel ; 


   const user = await users.findOne({_id :userId}) ; 
   console.log(user)
   if(!user){
    res.status(403).json("no user exist") 
   }

   next() ; 


    

     
}

module.exports={authorization}