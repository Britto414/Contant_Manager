const jwt = require('jsonwebtoken');

const validToken = async(req,res , next)=>{
    let token;
    let header = req.headers.Authorization || req.headers.authorization
    
    if(header && header.startsWith("Bearer")){
        token = header.split(" ")[1];

        jwt.verify(token , process.env.JWT_SECRET_PASSWORD,(err , decoded)=>{
            if(err){
                res.status(401).json({Error:"Token is Incorrect"})
                
            }

            req.user = decoded.user;
            next();
        })
    }

    if(!token){
        console.log( header);
        
        res.status(401).json({Error:"Token not found"})
    }
    // res.status(200).json(req.user)
}

module.exports = validToken;