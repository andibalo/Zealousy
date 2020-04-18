const express = require('express')
const router = new express.Router()
const bcrypt = require('bcryptjs')
const multer = require('multer')
const User = require('../models/User')
const auth = require('../middleware/auth')
const sharp = require('sharp')
const { sendWelcomeMessage, sendCancellationMessage } = require('../emails/account')

const upload = multer({
    //dest: 'avatars', - By removing dest we can pass the bianry data of img to the route handler otherwise it will be saved in the fielsystem

    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {

        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('File must be in jpg,jpeg or png'))
        }

        cb(undefined, true)
    }
})

//@Route    GET /api/users/:id/avatar
//@desc     get user picture profile
//@access

router.get('/:id/avatar', async (req, res) => {

    try {

        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            return res.status(400).json({ error: "user not found" })
        }

        res.set('Content-Type', 'image/jpg')

        res.send(user.avatar)
    } catch (error) {

        return res.status(400).json({ error })
    }
})

//@Route    POST /api/users
//@desc     create a user
//@access
router.post('/', async (req, res) => {

    const user = new User(req.body)

    try {

        await user.save()

        sendWelcomeMessage(user.name, user.email)

        const token = await user.generateAuthToken()

        res.status(200).json({ user, token })
    } catch (error) {

        res.status(400).send(error)
    }



})


//@Route    POST /api/users/login
//@desc     login
//@access

router.post('/login', async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).send('Invalid Credetials')
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).send('Invalid Credentials')
        }

        const token = await user.generateAuthToken()


        res.status(200).json({ user, token })
    } catch (error) {

        return res.status(500).send('server error')
    }
})

//@Route    GET /api/users/logout
//@desc     logout
//@access   Private

router.get('/logout', auth, async (req, res) => {

    try {



        req.user.tokens = req.user.tokens.filter(token => {
            return token.token != req.token
        })

        await req.user.save()

        res.status(200).send('logout succesful')
    } catch (error) {

        res.status(500).send(error)
    }
})


//@Route    GET /api/users/logoutAll
//@desc     logout all sessions
//@access   Private

router.get('/logoutAll', auth, async (req, res) => {

    try {

        req.user.tokens = []

        await req.user.save()

        res.status(200).send('logout all sessions succesful')
    } catch (error) {

        res.status(500).send(error)
    }
})


//@Route    GET /api/users/me
//@desc     get current user profile
//@access   Private
router.get('/me', auth, async (req, res) => {

    try {

        res.status(200).json(req.user)

    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
    }

})



//@Route    PATCH /api/users/me
//@desc     update a user
//@access

router.patch('/me', auth, async (req, res) => {

    //VALIDATING UPDATE FIELDS
    //We want to check if the fields user is trying to update is valid. Fields in the model created
    //to do that we turn object keys from user into an array of strings/keys using Object.keys() method

    //we place our model fields in an array and loop through using the every method to checking if all the keys in updates array is included

    //EVERY METHOD
    //every is an array method that returns true if everything is true and false if one false
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']

    const isValidUpdate = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidUpdate) {
        return res.status(400).send('invalid updates')
    }

    try {
        //new options obj returns the updated document and runValidators makes sure it is a valid update
        //if the value from user is empty runValidators will return an error
        //const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        //Refractored so schema middlewares will run
        //get user document by id and update it by looping over it and setting the value from req.body
        //const user = await User.findById(req.params.id)

        updates.forEach(update => {
            //user is an obj so we can dynamically access the fields using []
            req.user[update] = req.body[update]
        })

        //if the objid alrdy exists it will not create a new document
        await req.user.save()



        res.status(200).json(req.user)
    } catch (error) {

        res.status(400).send(error)
    }
})


//@Route    DELETE /api/users/me
//@desc     delete current user
//@access

router.delete('/me', auth, async (req, res) => {

    try {

        sendCancellationMessage(req.user.name, req.user.email)

        await req.user.delete()

        res.status(200).json(req.user)
    } catch (error) {

        res.status(400).send(error)
    }
})

//@Route    GET /api/users/:id/avatar
//@desc     serve up profile picture on url
//@access

router.delete('/:id/avatar', async (req, res) => {

    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            return res.status(400).send('User/avatar not found')
        }

        res.set('Content-Type', 'image/jpg')

        res.status(200).send(user.avatar)
    } catch (error) {

        res.status(500).json({ error })
    }

})


//@Route    DELETE /api/users/me/avatar
//@desc     delete profile picture
//@access

router.delete('/me/avatar', auth, async (req, res) => {

    req.user.avatar = undefined

    await req.user.save()

    return res.status(200).json(req.user)
})


//@Route    POST /api/users/me/avatar
//@desc     upload profile picture
//@access

router.post('/me/avatar', auth, upload.single('avatar'), async (req, res) => {

    //req.user.avatar = req.file.buffer

    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()

    req.user.avatar = buffer

    await req.user.save()

    res.status(200).json(req.user)

}, (error, req, res, next) => {

    res.status(400).send({ error: error.message })
})

//CUSTOM ERROR HANDLERS
//if the multer middleware throws error it will return a html.
//in order for it to return a json we put a callback funtion that handles error AFTER route handler
//the callback func MUST have (error, req, res, next) as argument so express knows it is a func that handles error

module.exports = router