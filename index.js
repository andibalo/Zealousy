const express = require('express')
const app = express()

require('./src/db/mongoose')
const port = process.env.PORT || 3000

const User = require('./src/models/User')
const Task = require('./src/models/Task')

app.use(express.json())

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})


//@Route    POST /users
//@desc     create a user
//@access
app.post('/users', (req, res) => {

    const user = new User(req.body)

    user.save().then(() => {
        res.send(user)
    }).catch((e) => {
        res.send(e)
    })
})

//@Route    GET /users
//@desc     get all users
//@access
app.get('/users', (req, res) => {

    User.find({}).then(users => {
        res.send(users)
    }).catch(e => {
        res.send(e)
    })
})

//@Route    GET /users/:id
//@desc     get a user by id
//@access
app.get('/users/:id', (req, res) => {

    const userId = req.params.id

    User.findById(userId).then(user => {

        if (!user) {
            return res.status(400).send('user not found')
        }

        res.send(user)
    }).catch(e => {
        res.send(e)
    })
})

//@Route    POST /tasks
//@desc     create a task
//@access
app.post('/tasks', (req, res) => {

    const task = new Task(req.body)

    task.save().then(() => {
        res.send(req.body)
    }).catch(e => {
        res.send(e)
    })
})

//@Route    GET /tasks
//@desc     get all tasks
//@access
app.get('/tasks', (req, res) => {

    Task.find({}).then(tasks => {
        res.send(tasks)
    }).catch(e => {
        res.send(e)
    })
})

//@Route    GET /tasks/:id
//@desc     get a task by id
//@access
app.get('/tasks/:id', (req, res) => {

    const userId = req.params.id

    Task.findById(userId).then(task => {

        if (!task) {
            return res.status(400).send('user not found')
        }

        res.send(task)
    }).catch(e => {
        res.send(e)
    })
})

