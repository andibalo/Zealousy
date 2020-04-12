const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/Task')


//ROUTER
//it is a class in express whcih is used to create routes with http methods
//before the route can be used it has to registered to express by using app.use and passing the router as argument

//@Route    POST /api/tasks
//@desc     create a task
//@access
router.post('/', auth, async (req, res) => {

    // const task = new Task(req.body)

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()

        res.json(task)
    } catch (error) {
        res.send(error)
    }

})

//@Route    GET /api/tasks
//@desc     get all tasks
//@access
router.get('/', auth, async (req, res) => {

    try {

        const tasks = await Task.find({ owner: req.user._id })

        if (!tasks) {
            return res.status(404).send('tasks not found')
        }

        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).send(error)
    }

})

//@Route    GET /api/tasks/:id
//@desc     get a task by id
//@access
router.get('/:id', auth, async (req, res) => {

    const userId = req.params.id

    try {

        // const task = Task.findById(userId)

        const task = await Task.findOne({ _id: userId, owner: req.user._id })

        if (!task) {
            return res.status(404).send('task not found')
        }

        res.status(200).json(task)
    } catch (error) {
        res.status(500).send(error)
    }

})

//@Route    PATCH /api/tasks/:id
//@desc     update a task
//@access

router.patch('/:id', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']

    const isValidUpdate = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidUpdate) {
        return res.status(400).send('invalid updates')
    }

    try {
        //new options obj returns the updated document and runValidators makes sure it is a valid update
        //if the value from user is empty runValidators will return an error
        //const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        //const task = await Task.findById(req.params.id)

        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(400).send('Task not found')
        }

        updates.forEach(update => {
            task[update] = req.body[update]
        })

        await task.save()



        res.status(200).json(task)
    } catch (error) {

        res.status(400).send(error)
    }
})

//@Route    DELETE /api/tasks/:id
//@desc     delete a task
//@access

router.delete('/:id', auth, async (req, res) => {

    try {

        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(400).send('task not found')
        }

        res.status(200).json(task)
    } catch (error) {

        res.status(400).send(error)
    }
})

module.exports = router