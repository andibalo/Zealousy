import React from 'react'
import Clock from 'react-live-clock'
import Moment from 'react-moment'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: theme.spacing(7),
        fontWeight: "500",
        color: "#ffa213",
    }
}))

const LiveClock = () => {

    const classes = useStyles()

    return (
        <React.Fragment>
            <Clock format="HH:mm:ss" interval={1000} ticking={true} className={classes.root} />
        </React.Fragment>
    )
}

export default LiveClock
