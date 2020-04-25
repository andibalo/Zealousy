import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { addTask, loadTasks } from '../../actions/task'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TaskFilter from './TaskFilter'
//MATERIAL UI
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    submitBtn: {
        backgroundColor: "#ff971d",
        color: "white",
        marginTop: theme.spacing(2)
    },

}))

const TaskForm = ({ addTask }) => {

    const classes = useStyles()

    const [formData, setFormData] = useState({
        completed: false,
        description: ''
    })

    const { description, completed } = formData

    const onChange = e => {

        setFormData({
            [e.target.name]: e.target.value
        })

        console.log(formData)
    }

    const onSubmit = e => {

        e.preventDefault()

        if (!description) {
            return console.log('please fill out the form')
        }

        description.trim()

        let firstLetter = description.charAt(0).toUpperCase()
        let newDescription = firstLetter + description.slice(1)

        addTask({ completed, description: newDescription })

        setFormData({
            description: ''
        })
    }


    return (
        <Box>
            <TaskFilter />
            <form onSubmit={e => onSubmit(e)}>
                <Box display="flex" flexDirection="column">
                    <TextField
                        id="outlined-multiline-static"
                        name="description"
                        multiline
                        rows={4}
                        onChange={e => onChange(e)}
                        placeholder="Write down your tasks here..."
                        variant="outlined"
                        value={description}
                    />
                    <Button type="submit" variant="contained" startIcon={<AddIcon />} className={classes.submitBtn} >
                        Add Task
                    </Button>
                </Box>
            </form>
        </Box>

    )
}

TaskForm.propTypes = {
    addTask: PropTypes.func.isRequired,
}

export default connect(null, { addTask })(TaskForm)
