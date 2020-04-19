const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./Task')

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
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

//VIRTUAL FIELDS
//virtual fields are used to store something but it is not stored in the database/document. It just tells monggose what owns what
//in this case what the tasks field in Userschema owns

//USER-TASKS is a one-to-many relationship and it is better to use virtual field than storing it in the user docuement
//because the task is stored in different collection therefore saving resources

//local/foreign field tells us what we want to get when we call populate('tasks') on users
//in this case get all tasks with a certain user ObjectId
UserSchema.virtual('tasks', {
    ref: 'Tasks',
    localField: '_id', //the field thats refrenced in the other document
    foreignField: 'owner' //the User document refernce field in the Tasks document
})


//HIDING USER PRIVATE DATA
//toJSON method modifies the returning object of the object it is called upon and is called after JSON.stringify is called
//JSON.stringify is called evertime the server sends back to the client - res.send(). Hence we can modifi the obj as to not
//show the email and password

//res.send -> json.stringify -> toJSON - modify data here
UserSchema.methods.toJSON = function () {
    const user = this

    //change the mongoose document into the a raw object
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens


    return userObject
}
//CUSTOM METHODS ON MODEL/MODEL INSTANCE - They are promises
//METHODS =  MODEL INSTANCE
UserSchema.methods.generateAuthToken = async function () {

    const user = this //thsi referes to the document

    const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET)


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

UserSchema.pre('remove', async function (next) {

    const user = this

    await Task.deleteMany({ owner: user._id })

    next()
})

module.exports = User = mongoose.model('Users', UserSchema)