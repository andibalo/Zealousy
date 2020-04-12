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
//@Params   GET /api/tasks?completed=true
//          GET /api/tasks?limit=10&skip=10
//          GET /api/tasks?sortby=createdAt:desc
router.get('/', auth, async (req, res) => {

    //NOTE QUERY STRINGS ARE STRING

    const match = {}
    const sort = {}
    //check if completed query string exists
    if (req.query.completed) {
        match.completed = req.query.completed === 'true' //if true it will return true boolean else false
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(":")

        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        //MATCH
        //we use match obj containing fields for search crtieria to sort data using populate
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()

        //EXECPOPULATE
        //it is used to execute population and return promise
        //it is not needed if the query has alrdy returned a promois 
        //example: Task.finbyId().populate() - this will execute populate automatically and return pormise

        if (!req.user.tasks) {
            return res.status(404).send('tasks not found')
        }

        res.status(200).json(req.user.tasks)
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