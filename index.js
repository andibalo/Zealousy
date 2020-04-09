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
app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {

        await user.save()

        res.json(user)
    } catch (error) {

        res.status(400).send(error)
    }



})

//@Route    GET /users
//@desc     get all users
//@access
app.get('/users', async (req, res) => {

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

//@Route    GET /users/:id
//@desc     get a user by id
//@access
app.get('/users/:id', async (req, res) => {

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

//@Route    POST /tasks
//@desc     create a task
//@access
app.post('/tasks', async (req, res) => {

    const task = new Task(req.body)

    try {
        await task.save()

        res.json(task)
    } catch (error) {
        res.send(error)
    }

})

//@Route    GET /tasks
//@desc     get all tasks
//@access
app.get('/tasks', async (req, res) => {

    try {

        const tasks = await Task.find({})

        if (!tasks) {
            return res.status(404).send('tasks not found')
        }

        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).send(error)
    }

})

//@Route    GET /tasks/:id
//@desc     get a task by id
//@access
app.get('/tasks/:id', async (req, res) => {

    const userId = req.params.id

    try {

        const task = Task.findById(userId)

        if (!task) {
            return res.status(404).send('task not found')
        }

        res.status(200).json(task)
    } catch (error) {
        res.status(500).send(error)
    }

})

