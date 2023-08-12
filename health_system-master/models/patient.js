const mongoose = require('mongoose')
const schema = mongoose.Schema
const PatientSchema = new schema({
    firstname:{
        type: String,
        unique: true,
	   required: true 
    },
    lastname:{
        type: String,
        unique: true,
	   required: true 
    },
    age:{
        type:Number,
        requried:true
    },
    sex:{
        type:String,
        enum:['Male','Female']
    },
    diseases:[{type:schema.Types.ObjectId, ref:'Disease'}]
})

module.exports = mongoose.model('Patient',PatientSchema)