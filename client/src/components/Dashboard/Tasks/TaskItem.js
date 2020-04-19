import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteTask, editTask } from '../../../actions/task'
//MATERIAL UI
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2)
    }
}))

const TaskItem = ({ task, deleteTask, editTask }) => {

    const classes = useStyles()

    const { completed, description, created, _id } = task

    //const [isCompleted, setIsCompleted] = useState(false)


    const onClick = e => {

        editTask({ completed: !completed }, _id)
        console.log(completed)

        // setIsCompleted(!isCompleted)
        // console.log(isCompleted)
    }


    return (
        <Grid item xs={12} >
            <Paper className={classes.paper} elevation={3}>
                <Box display="flex" alignItems="center">
                    <Typography variant="h6" style={{ marginRight: "auto" }}>
                        {description}
                    </Typography>
                    <div>
                        <IconButton onClick={e => onClick(e)}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={e => deleteTask(_id)}>
                            <ClearIcon />
                        </IconButton>
                    </div>
                </Box>
            </Paper>
        </Grid>
    )
}

TaskItem.propTypes = {
    completed: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    deleteTask: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
}

export default connect(null, { deleteTask, editTask })(TaskItem)
