const zod = require("zod")

const user = zod.object({
    fname:zod.string() ,
    lname: zod.string().min(1) , 
    mail:zod.string().email(), 
    password:zod.string() 
})


const jwt = require('jsonwebtoken');
const secret = "mynameismayank"
const userSchema = require('../model/user') 

const userSignUp = async (req ,res)=>{

  try {
    
    const body = req.body
    
    const requireUser = user.required()
    
    const success = requireUser.safeParse(body).success;

    console.log(success)
      
    if(success==false){
      return res.status(400).send("not a valid input");
      }


      const users = userSchema.userModel
      console.log(users)
      const email = body.mail

      const person = users.find({
        mail:email
      })

      console.log(person)
  


      if(person){
        return res.status(400).send("user already exist")
      }


      const newUser = new userSchema.userModel()
      
      newUser.fname = body.fname ; 
      newUser.lname = body.lname ; 
      newUser.mail = body.mail ; 
      newUser.password = body.password;
      
      console.log(newUser);
      
      await newUser.save()
      
      
     return  res.status(200).send("longIn Successfull")
      
    } catch (error) {
        return res.status(400).send(error.message); 
    }
}






const userLogin = async (req , res)=>{
  try {
    const email = req.body.mail 
    const password = req.body.password 
    const users = userSchema.userModel ; 
    console.log(users)

    const person = await users.findOne({
      'mail':email
    })


   if(!person._id){
    return res.status(400).json("user not exist")
   }

   if(password != person.password){
    return res.status(400).json("credentials not correct")
   }

    const userId = person._id 
    const token = jwt.sign({
      userId
    } , secret)

    console.log(token)



    return res.status(200).json({
      message:"user Login successfull",
      token:token , 
    }) ; 

    
  } catch (error) {
   return  res.status(400).send("some error has occured")
  }
}


module.exports= {userSignUp , userLogin}