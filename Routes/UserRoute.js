const express = require("express")
const validToken =require('../Middleware/ValidateToken')
const router = express.Router()
const {LoginUser ,
    RegisterUser,
    CurrentUser} = require('../Controllers/UserControl')



router.post("/register",RegisterUser ).post("/login",LoginUser)

router.get("/current" ,validToken ,  CurrentUser)

module.exports = router;