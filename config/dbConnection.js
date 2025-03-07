const db = require('mongoose')

const connectDb = async()=>{
    try{
        const connect = await db.connect(process.env.CONNECTION_STRING);
        console.log('Database connected' , connect.connection.host ,connect.connection.name);
        
    }catch(err){
        console.log(err);
        process.exit(0);
    }
}

module.exports = connectDb;