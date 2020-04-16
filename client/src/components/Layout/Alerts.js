import React from 'react'
import Alert from '@material-ui/lab/Alert';
import Fade from '@material-ui/core/Fade'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { removeAlert } from '../../actions/alert'


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

const Alerts = ({ alerts, removeAlert }) => {

    const classes = useStyles()

    if (alerts.length > 3) {

        removeAlert(alerts[0].id)
    }

    return (
        <div className={classes.root}>
            {alerts !== null && alerts.length > 0 && alerts.map((alert, index) => (

                <Fade key={index} in={true}>
                    <Alert className={classes.alert} key={alert.id} severity={alert.type}>{alert.msg}</Alert>
                </Fade>
            ))}
        </div>
    )
}

const mapStateToProps = state => ({
    alerts: state.alert
})


export default connect(mapStateToProps, { removeAlert })(Alerts)