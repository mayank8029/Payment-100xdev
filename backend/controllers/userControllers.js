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

const accountSchema = require("../model/Account")

const userSignUp = async (req ,res)=>{

  try {
    
    const body = req.body
    
    const requireUser = user.required()
    
    const success = requireUser.safeParse(body).success;

   
      
    if(success==false){
      return res.status(400).send("not a valid input");
      }


      const users = userSchema.userModel
      // console.log(users)
      const email = body.mail

      const person = await users.findOne({
        mail:email
      })

      
  


      if(person){
        return res.status(400).send("user already exist")
      }


      const newUser = new userSchema.userModel
      
      newUser.fname = body.fname ; 
      newUser.lname = body.lname ; 
      newUser.mail = body.mail ; 
      newUser.password = body.password;
      
      // console.log(newUser);
      
      const currUser = await newUser.save()
     

      const newAccount = new accountSchema.accountModel

      console.log("newAccount")
      console.log(newAccount)

      newAccount._id = currUser._id ; 
      newAccount.balance = 1 + Math.random()*10000 

      console.log(newAccount)

       const currAccount = await newAccount.save() ; 
      
      
     return  res.status(200).send("signup Successfull")
      
    } catch (error) {
        return res.status(400).send(error.message); 
    }
}






const userLogin = async (req , res)=>{
  try {
    console.log(req.body)
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

const updatedBody = zod.object({
  fname:zod.string().optional() , 
  lname: zod.string().optional() , 
  password:zod.string().optional()
})
 

const updateCredential = async (req , res)=>{
    const credential = req.body ; 
    console.log(credential)
    // console.log(updatedBody)

    const success = updatedBody.safeParse(credential).success ; 
    console.log(success)

    if(!success) return res.status(404).json("invalid input"); 
 
    const userModel = userSchema.userModel ; 

    const myUser = await userModel.findOne({
      mail:credential.mail 
    }) 

    if(!myUser._id) res.status(403).json("no user exist") ; 

    if(myUser.password!=credential.password) res.status(403).json("Incorrect password") ; 

    const updateFields = {
      fname: credential.fname,
      lname: credential.lname , 
      password: credential.password
    }

    const options ={
      new:true , 
    }

    const updatedUser = await userModel.findByIdAndUpdate(myUser._id ,updateFields , options);

    console.log(updatedUser)
    return res.status(200).json(updatedUser); 



}


const getUsers = async(req , res)=>{
  const fpara = req.query.filter || "";
  console.log(fpara)
  const uschema = userSchema.userModel ; 
  const users = await uschema.find({
    $or:[
      {
        fname:{
          "$regex":fpara 
        }

      },{
          lname:{
            "$regex":fpara
          }
      }
    ]

    
  })
    
    
    
  console.log(users)

  res.json(users)

}


module.exports= {userSignUp , userLogin , getUsers , updateCredential}