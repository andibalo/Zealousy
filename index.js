const express = require('express')
const app = express()
require('./src/db/mongoose')


app.use(express.json())

//APP.USE 
//is used to run a middlewre function at a certain path, if path is not specified it is root path '/'
//it is also used to register routes created by express router instance to enable us to access it
app.use('/api/users', require('./src/routes/user'))
app.use('/api/tasks', require('./src/routes/task'))

//Serve static assest in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})





