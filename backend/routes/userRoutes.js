const express = require("express");
const {userSignUp , userLogin}  = require("../controllers/userControllers");
const router = express.Router();

router.post("/register", userSignUp)
router.post("/login" , userLogin)


module.exports = router 