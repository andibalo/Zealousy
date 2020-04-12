const express = require('express')
const router = new express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const auth = require('../middleware/auth')

//@Route    POST /api/users
//@desc     create a user
//@access
router.post('/', async (req, res) => {

    const user = new User(req.body)

    try {

        await user.save()

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

//@Route    GET /api/users/:id
//@desc     get a user by id
//@access
// router.get('/:id', async (req, res) => {

//     const userId = req.params.id

//     try {
//         const user = await User.findById(userId)

//         if (!user) {
//             return res.status(404).send('user not found')
//         }

//         res.status(200).json(user)
//     } catch (error) {
//         res.status(500).send(error)
//     }

// })


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
        await req.user.delete()

        res.status(200).json(req.user)
    } catch (error) {

        res.status(400).send(error)
    }
})

module.exports = router