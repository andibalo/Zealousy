import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { addTask } from '../../actions/task'
import { connect } from 'react-redux'

//MATERIAL UI
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
    submitBtn: {
        backgroundColor: "#ff971d",
        color: "white",
        marginTop: theme.spacing(2)
    },
    filterWrapper: {
        marginBottom: theme.spacing(4)
    },
    radioGroup: {
        flexDirection: "row"
    },
    filterBy: {
        marginBottom: theme.spacing(2)
    },
    sortBy: {
        marginBottom: theme.spacing(2)
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

        addTask({ completed, description })

        setFormData({
            description: ''
        })
    }

    return (
        <Box>
            <Box className={classes.filterWrapper}>
                <Box className={classes.filterBy}>
                    <Typography variant="h5">
                        Filter By
                    </Typography>
                    <FormControl component="fieldset">
                        <RadioGroup name="filter" className={classes.radioGroup} defaultValue="none">
                            <FormControlLabel value="none" control={<Radio />} label="None" />
                            <FormControlLabel value="incomplete" control={<Radio />} label="Incompleted" />
                            <FormControlLabel value="completed" control={<Radio />} label="Completed" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box className={classes.sortBy}>
                    <Typography variant="h5">
                        Sort By
                    </Typography>
                    <FormControl component="fieldset">
                        <RadioGroup name="sort" className={classes.radioGroup} defaultValue="none">
                            <FormControlLabel value="none" control={<Radio />} label="None" />
                            <FormControlLabel value="earliest" control={<Radio />} label="Earliest" />
                            <FormControlLabel value="latest" control={<Radio />} label="Latest" />
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Box>
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
