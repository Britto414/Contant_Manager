
const exp =  require('express');
const connectDB = require('./config/dbConnection')
const app = exp();
const cors = require('cors');
const routes = require("./Routes/ContactRoute");
const errorHandle  = require('./Middleware/HandleError')
require('dotenv').config()

const port =process.env.PORT || '5001';

connectDB();

app.use(cors());
app.use(exp.json()); 

app.use("/api/contacts" , routes);
app.use("/api/user" , require("./Routes/UserRoute"));
app.use(errorHandle);

app.listen(port ,(req , res)=>{  
    console.log(`Server is running on port ${port}`);
}) 