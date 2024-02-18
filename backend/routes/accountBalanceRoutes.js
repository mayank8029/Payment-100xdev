const express = require("express") 

const {getBalance , transferBalance}  = require("../controllers/accountBalance")
const {authorization} = require("../middleware/middleware.jsx")

const router = express.Router();

router.get("/balance" , authorization ,  getBalance) ; 

router.put("/transfer" , authorization, transferBalance) ; 


module.exports = router 