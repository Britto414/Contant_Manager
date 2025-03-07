const mongoose= require('mongoose')

const schema  = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref :'User'
    },
    name :{
        type:String,
        required:[true , 'Add Name']
    },
    phone:{
        type:String,
        required:[true , 'Add mail'] 
    }
},{
    timestamps:true 
})

module.exports = mongoose.model('Contact' , schema);