import React from 'react'
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        marginTop: theme.spacing(3),
        zIndex: 999
    },
    alert: {
        marginTop: theme.spacing(2),
        position: "relative",

    }
}))

const Alerts = ({ alerts }) => {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            {alerts !== null && alerts.length > 0 && alerts.map(alert => (
                <Alert className={classes.alert} key={alert.id} severity={alert.type}>{alert.msg}</Alert>
            ))}
        </div>
    )
}

const mapStateToProps = state => ({
    alerts: state.alert
})


export default connect(mapStateToProps)(Alerts)