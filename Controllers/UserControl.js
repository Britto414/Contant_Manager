const User = require("../models/UserSchema")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const LoginUser = async(req , res)=>{
    const {mail, password} = req.body;
    console.log(mail);
    
    if(!mail || !password ){ 
        res.status(404).send("Data Not Foud");
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
    }

    if(!user){
        res.status(404).json({message:'No User Found'})
    }
}

const RegisterUser = async (req, res) => {
    const {user ,  mail, password } = req.body;
    // console.log(mail, password);

    if (!user || !mail || !password) {
        return res.status(400).json({ error: 'All fields are mandatory' }); 
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
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};


const CurrentUser = async(req , res)=>{
    res.status(202).json({Current_User:req.user});
}

module.exports = {
    LoginUser ,
    RegisterUser,
    CurrentUser
}