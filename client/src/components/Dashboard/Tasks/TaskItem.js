import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2)
    }
}))

const TaskItem = ({ completed, description, created }) => {

    const classes = useStyles()

    return (
        <Grid item xs={12} >
            <Paper className={classes.paper} elevation={3}>
                <Typography variant="subtitle2">
                    {description}
                </Typography>
            </Paper>
        </Grid>
    )
}

TaskItem.propTypes = {
    completed: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
}

export default TaskItem
