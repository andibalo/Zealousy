import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import TaskItem from './TaskItem'
import Typography from '@material-ui/core/Typography'

const Task = ({ task: { loading, tasks, task } }) => {

    return !loading && tasks.length > 0 ? (
        <div>
            <Grid container spacing={2} >
                {tasks.map(task => (
                    <TaskItem key={task._id} task={task} />
                ))}
            </Grid>
        </div>
    ) : (
            <div>
                <Typography variant="h5" style={{ color: "#ff971d" }}>
                    Seems like you don't have any tasks yet...
                </Typography>
                <Typography variant="subtitle1">
                    Let's find some things to do!
                </Typography>
            </div>
        )
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    task: state.task
})

export default connect(mapStateToProps)(Task)
