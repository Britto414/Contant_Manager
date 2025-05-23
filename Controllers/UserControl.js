const User = require("../models/UserSchema")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler') 

const LoginUser = asyncHandler(async(req , res)=>{
    const {mail, password} = req.body;
    // console.log(mail);
    
    if(!mail || !password ){ 
        res.status(404)
        throw new Error("invalid credential");
    }

    const user = await User.findOne({mail});

    if(user && await bcrypt.compare(password , user.password)){
        const accessToken = jwt.sign(
            {
                user: {
                    user:user.user,
                    email: user.mail, 
                    id: user._id       
                }
            },
            process.env.JWT_SECRET_PASSWORD,  
            { expiresIn: "120m" }  
        );
        res.status(200).json({message:"Login Sccessful",token:accessToken,User:user})
    }else{
        res.status(403);
        throw new Error('No User Found');
    }
})

const RegisterUser = asyncHandler(async (req, res) => {
    const {user ,  mail, password } = req.body;
    // console.log(mail, password);

    if (!user || !mail || !password) {
        res.status(404)
        throw new Error("invalid credential");
    }

    try {
        const existingUser = await User.findOne({ mail });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" }); 
        }

        // Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const addedUser = await User.create({
            user,
            mail,
            password: hashedPassword
        });

        res.status(201).json({ message: "User registered successfully", user: addedUser });
    } catch (error) {
        res.status(500)
        throw new Error("Something went wrong");
    }
});


const CurrentUser = async(req , res)=>{
    res.status(200).json({Current_User:req.user});
}

module.exports = {
    LoginUser ,
    RegisterUser,
    CurrentUser
}