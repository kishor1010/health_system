const mongoose = require('mongoose')
const schema = mongoose.Schema
const DiseaseSchema = new schema({
    name:{
        type: String,
        unique: true,
	   required: true 
    },
    type:{
        type: String,
        unique: true,
	   required: true 
    }
})

module.exports = mongoose.model('Disease',DiseaseSchema)