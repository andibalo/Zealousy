const express = require('express')
const app = express()
const Task = require('./src/models/Task')
const User = require('./src/models/User')
require('./src/db/mongoose')
const port = process.env.PORT || 3000

app.use(express.json())

//APP.USE 
//is used to run a middlewre function at a certain path, if path is not specified it is root path '/'
//it is also used to register routes created by express router instance to enable us to access it
app.use('/api/users', require('./src/routes/user'))
app.use('/api/tasks', require('./src/routes/task'))

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})





