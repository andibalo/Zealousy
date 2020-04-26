import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteTask, editTask } from '../../../actions/task'
import Moment from 'react-moment'

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
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        position: "relative",
    },
    paperIndicator: {
        position: "absolute",
        top: "0",
        left: "0",
        width: "5px",
        borderTopLeftRadius: "4px",
        height: "100%",
        borderBottomLeftRadius: "4px"
    },
    deleteBtn: {
        color: "rgba(244, 67, 54)",
        '&:hover': {
            backgroundColor: "rgba(244, 67, 54, 0.7)",
            color: "white"
        }
    },
    editBtn: {
        color: "rgba(251, 192, 45)",
        marginRight: theme.spacing(1.5),
        '&:hover': {
            backgroundColor: "rgba(251, 192, 45, 0.7)",
            color: "white"
        }
    },
    checkBtn: {
        color: "rgba(0, 230, 118)",
        marginRight: theme.spacing(1.5),
        '&:hover': {
            backgroundColor: "rgba(0, 230, 118, 0.7)",
            color: 'white'
        }
    },
    checkedBtn: {
        backgroundColor: "rgba(0, 230, 118, 0.7)",
        color: 'white',
        marginRight: theme.spacing(1.5),
        '&:hover': {
            backgroundColor: "rgba(0, 230, 118, 1)"
        }
    },
    taskDate: {
        marginRight: theme.spacing(1.5)
    }
}))

const TaskItem = ({ task, deleteTask, editTask }) => {

    const classes = useStyles()

    const { completed, description, createdAt, _id } = task


    const onClick = e => {
        editTask({ completed: !completed }, _id)
        console.log(completed)
    }


    return (
        <Grid item xs={12} >
            <Paper className={classes.paper} elevation={3} >
                <div className={classes.paperIndicator} style={{ backgroundColor: completed ? "#00e676" : "#9e9e9e" }} />
                <Box display="flex" alignItems="center">
                    <Typography variant="h6" style={{ marginRight: "auto" }}>
                        {description}
                    </Typography>
                    <Moment format="D MMM YY, HH:mm A" className={classes.taskDate}>
                        {createdAt}
                    </Moment>
                    <div>
                        <Tooltip title={!completed ? "Mark as Complete" : "Mark as Incomplete"} arrow>
                            <IconButton className={!completed ? classes.checkBtn : classes.checkedBtn} onClick={e => onClick(e)}>
                                <CheckIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Task" arrow>
                            <IconButton className={classes.editBtn}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Task" arrow>
                            <IconButton className={classes.deleteBtn} onClick={e => deleteTask(_id)}>
                                <ClearIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Box>
            </Paper>
        </Grid>
    )
}

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
}



export default connect(null, { deleteTask, editTask })(TaskItem)
