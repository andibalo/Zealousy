import React from 'react'
import PropTypes from 'prop-types'
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

//MATERIAL UI
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    progressDesc: {
        marginTop: theme.spacing(2),
        fontWeight: "500"
    }
}))
const ProgressBar = ({ task: { tasks } }) => {

    const classes = useStyles()

    let totalTasks = 0
    let incompleteTasks = 0;
    let completeTasks = 0;
    let percentage = 0;

    if (tasks.length > 0) {
        tasks.forEach(task => {
            task.completed ? ++completeTasks : ++incompleteTasks;
            ++totalTasks;
        })

        percentage = Math.round((completeTasks / totalTasks) * 100)
    }





    return (
        <div >
            <CircularProgressbarWithChildren
                value={percentage}
                text={`${percentage}%`}
                strokeWidth={5}
                styles={{
                    // Customize the root svg element
                    root: {
                        maxHeight: "150px"
                    },
                    // Customize the path, i.e. the "completed progress"
                    path: {
                        // Path color
                        stroke: `#ff971d`,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'round',
                        // Customize transition animation
                        transition: 'stroke-dashoffset 0.5s ease 0s',
                        // Rotate the path
                        transform: 'rotate(0)',
                        transformOrigin: 'center center',
                    },
                    // Customize the circle behind the path, i.e. the "total progress"
                    trail: {
                        // Trail color
                        stroke: '#d6d6d6',
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'butt',
                        // Rotate the trail
                        transform: 'rotate(0.25turn)',
                        transformOrigin: 'center center',
                    },
                    // Customize the text
                    text: {
                        // Text color
                        fill: '#ff971d',
                        // Text size
                        fontSize: '16px',
                    },
                    // Customize background - only used when the `background` prop is true
                    background: {
                        fill: '#3e98c7',
                    },
                }}
            >

            </CircularProgressbarWithChildren>
            <Typography variant="h5" className={classes.progressDesc} align="center">
                Completed
            </Typography>
        </div>
    )
}

ProgressBar.propTypes = {
    task: PropTypes.object.isRequired,
}

export default ProgressBar
