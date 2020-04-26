import React from 'react'
import PropTypes from 'prop-types'

//MATEERIAL UI
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    headerPrimary: {
        color: "#ff971d",
        fontWeight: "500"
    },
    headerSecondary: {
        color: "#ff971d"
    },
    subHeader: {
        fontWeight: "500"
    }
}))

const TaskCounter = ({ task: { tasks } }) => {

    const classes = useStyles()

    let totalTasks = 0
    let incompleteTasks = 0;
    let completeTasks = 0;

    tasks.map(task => {
        task.completed ? ++completeTasks : ++incompleteTasks;
        return ++totalTasks;
    })


    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h2" className={classes.headerPrimary}>
                        {incompleteTasks}
                    </Typography>
                    <Typography variant="h5" className={classes.subHeader}>
                        {' '}Tasks Left
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h4" className={classes.headerSecondary}>
                        {totalTasks}
                    </Typography>
                    <Typography variant="body1">
                        {' '}Total Tasks
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h4" className={classes.headerSecondary}>
                        {completeTasks}
                    </Typography>
                    <Typography variant="body1">
                        {' '}Completed Tasks
                </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

TaskCounter.propTypes = {
    task: PropTypes.object.isRequired,
}

export default TaskCounter
