import React from 'react'
import Clock from 'react-live-clock'
import Moment from 'react-moment'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: theme.spacing(9),
        fontWeight: "500",
        color: "#ffa213",
    },
    subDate: {
        fontSize: theme.spacing(4.5),
        fontWeight: "500"
    }
}))

const LiveClock = () => {

    const classes = useStyles()

    const date = new Date()

    return (
        <React.Fragment>
            <Clock format="HH:mm:ss" interval={1000} ticking={true} className={classes.root} />
            <Moment format="ddd, D MMM YY" className={classes.subDate}>{date}</Moment>
        </React.Fragment>
    )
}

export default LiveClock
