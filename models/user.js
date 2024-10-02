const mongoose = require('mongoose')

const userSchema = ({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    passwordHash:{
        type: String,
        required: true,
    }
    
})

const User = mongoose.model('userSchema', userSchema)
module.exports = User