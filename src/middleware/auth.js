const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {

    const token = req.header('auth-token')

    if (!token) {
        return res.status(400).json({ msg: 'No token found' })
    }

    try {

        //AUTH MIDDLEWARE
        //in the auth midddleware we decode the user id from token and query the database to find the user data using the
        //decoded id and the token. Then we store the user data inside req obj

        const decoded = jwt.verify(token, 'secret')

        const user = await User.findOne({ _id: decoded.id, 'tokens.token': token })

        if (!user) {
            return res.status(404).json({ msg: 'user not found' })
        }

        //MULTIPLE/SINGLE SESSIONS ON USER
        //in order to logout of only one session/device - each device generates different token although the same user
        //we placethe generated token for the current user in the req obj and then we filter it out from the tokens array
        //that each user has
        req.token = token
        req.user = user

        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'Invalid Token' })
    }
}

module.exports = auth