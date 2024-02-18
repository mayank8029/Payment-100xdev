const express = require("express");
const {userSignUp , userLogin , getUsers , updateCredential}  = require("../controllers/userControllers");
const { authorization } = require("../middleware/middleware.jsx");
const router = express.Router();

router.post("/register", userSignUp)
router.get("/login" , userLogin)
router.get('/user' , getUsers ) 
router.put('/updateCredential' , authorization, updateCredential)


module.exports = router 