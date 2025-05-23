const jwt = require('jsonwebtoken');

const validToken = async(req,res , next)=>{
    let token;
    let header = req.headers.Authorization || req.headers.authorization
    
    if(header && header.startsWith("Bearer")){
        token = header.split(" ")[1];

        jwt.verify(token , process.env.JWT_SECRET_PASSWORD,(err , decoded)=>{
            if(err){
                res.status(401)
                throw new Error("Token is unauthorized");
            }else{
                req.user = decoded.user;
            }
            next();
        })
    }else{
        res.status(404)
        throw new Error("Token not found")
    }
}

module.exports = validToken;