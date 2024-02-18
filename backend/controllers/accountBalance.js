const jwt = require("jsonwebtoken")
const AccountSchema = require("../model/Account")
const userSchema = require("../model/user")
const { default: mongoose } = require("mongoose")
const secret = "mynameismayank"
const getBalance = async (req , res)=>{
    try {
        
        
        const tokenBearer = req.headers.authorization; 
        console.log(tokenBearer)

        if(!tokenBearer || !tokenBearer.startsWith("Bearer ")) return res.status(403).json("invalid token")
        
        const token = tokenBearer.split(" ")[1] ; 
        const information = jwt.verify(token , secret) ; 
        console.log(information)
        
        if(!information) return  res.status(404).json("invalid token")
    
    const user_id = information.userId ;

    const accountModel = AccountSchema.accountModel;
    
   

    const userAccount = await accountModel.findById({_id:user_id}) ;
    conaole.log(userAccount)
    
    if(!userAccount) return res.status(404).json("invalid token")
    
    const userBalance = userAccount.balance ; 
    
    res.json({userBalance})
} catch (error) {
    
    res.status(404).json(error)

           }
}

const transferBalance = async (req , res)=>{

    
    try {

        const session  = await  mongoose.startSession()
        const info = req.body ; 
        const tokenBearer = req.headers.authorization ; 
        if(!tokenBearer || !tokenBearer.startsWith("Bearer ")) return res.status(404).json("token not valid")

        const token = tokenBearer.split(" ")[1] ;

        const information = jwt.verify(token , secret) ; 
        const from = information.userId ; 
        const to = info.to ; 
        const amount = info.amount ; 

        
        const accountModel= AccountSchema.accountModel ;
        
        
        
        const senderInfo = await accountModel.findById({_id:from})
        const recieverInfo = await  accountModel.findById({_id:to})

        console.log(senderInfo) ; 
        console.log(recieverInfo)

        if(!recieverInfo) return res.status.json("reciver account not exist")

        if(senderInfo.balance<amount) return res.status(404).json("insufficient amount") ;
        
        await session.startTransaction() ; 

        await accountModel.updateOne({
            _id:to
        },{
         $inc:{
            balance:amount 
         }

        })

        await accountModel.updateOne({
            _id:from
        },{
         $inc:{
            balance:-amount 
         }

        })

        await session.commitTransaction()


        return res.json("amount transfered")




        
        
    } catch (error) {
        res.status(404).json("something wrong happen ")
    }

}


module.exports= {getBalance , transferBalance }