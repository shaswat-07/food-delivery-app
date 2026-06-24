import mongoose from 'mongoose'
const userSchema= new mongoose.Schema({


    name:{
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },


    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'invalid email']
    },


    password: {
        type: String,
        minlength: 6
    },


    provider: {
        type: String,
        enum: ['google', 'local'],
        default: 'local'
    },


    picture:{
        type: String,
        optional: true 
    },

    
    address:{
        type: String,
        minlength: 15,
        maxlength: 255
    }
})

export default mongoose.model('user', userSchema)

