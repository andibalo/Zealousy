const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

//CUSTOM METHODS ON MODEL/MODEL INSTANCE - They are promises
//METHODS =  MODEL INSTANCE
UserSchema.methods.generateAuthToken = async function () {

    const user = this //thsi referes to the document

    const token = jwt.sign({ id: user._id.toString() }, 'secret')


    user.tokens = [...user.tokens, { token }]

    await user.save()

    return token
}

//SCHEMA MIDDLEWARE
//using the shcema we can use middleware functions that run before or after certain events like 'save'

//QUERIES THAT BYPASS MIDDLEWARES
//certain queries like findbyidandupdate will bypass the middleware fucntions
UserSchema.pre('save', async function (next) {

    const user = this //this refers to the document about to be saved

    //isModified is a method from ongoose on the document which receives fields to check it is modified
    if (user.isModified('password')) {

        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

module.exports = User = mongoose.model('Users', UserSchema)