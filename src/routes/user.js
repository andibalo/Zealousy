const express = require('express')
const router = new express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')


//@Route    POST /api/users
//@desc     create a user
//@access
router.post('/', async (req, res) => {

    const user = new User(req.body)

    try {

        await user.save()

        res.json(user)
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

        res.status(200).json(user)
    } catch (error) {

        return res.status(500).send('server error')
    }
})
//@Route    GET /api/users
//@desc     get all users
//@access
router.get('/', async (req, res) => {

    try {

        const users = await User.find({})

        if (!users) {
            return res.status(404).send('users not found')
        }

        res.status(200).json({ users })
    } catch (error) {

        res.status(500).send('server error')
    }

})

//@Route    GET /api/users/:id
//@desc     get a user by id
//@access
router.get('/:id', async (req, res) => {

    const userId = req.params.id

    try {
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).send('user not found')
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).send(error)
    }

})


//@Route    PATCH /api/users/:id
//@desc     update a user
//@access

router.patch('/:id', async (req, res) => {

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
        const user = await User.findById(req.params.id)



        updates.forEach(update => {
            //user is an obj so we can dynamically access the fields using []
            user[update] = req.body[update]
        })

        //if the objid alrdy exists it will not create a new document
        await user.save()

        if (!user) {
            return res.status(400).send('User not found')
        }

        res.status(200).json(user)
    } catch (error) {

        res.status(400).send(error)
    }
})

//@Route    DELETE /api/users/:id
//@desc     delete a user
//@access

router.delete('/:id', async (req, res) => {

    try {
        const user = User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(400).send('user not found')
        }

        res.status(200).json(user)
    } catch (error) {

        res.status(400).send(error)
    }
})

module.exports = router