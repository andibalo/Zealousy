import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Grid, Typography, makeStyles, Button, Box, Container } from '@material-ui/core'
import Login from '../auth/Login'


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh"
    },
    buttons: {
        marginTop: theme.spacing(2),
        "& button.active": {
            backgroundColor: 'white',
            color: '#ff971d',
            marginRight: theme.spacing(1)
        },
        "& button": {
            color: 'white',
            borderColor: 'white',
            boxSizing: 'border-box'
        }

    },
    wrapper: {
        position: "relative",
        '&::before': {
            content: '""',
            position: "absolute",
            right: 0,
            height: "100%",
            width: "60%",
            backgroundColor: "#ff971d",
            zIndex: -1
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },

}))


const LoginLanding = ({ isAuthenticated }) => {
    const classes = useStyles()

    //CHECK is changed to localstorage.getItem('token') because flashes of component is rendered
    //WHEN USING STATE AS CHECK, it requires time to fetch data hence the check is skipped and component is rendered
    //until the data comes back from server. SO WE USE LOCAL STORAGE BCS IT IS ALwAYS THERE

    if (localStorage.getItem('token')) {
        return <Redirect to="/dashboard" />
    }

    console.log('login', isAuthenticated)
    return (
        <Box className={classes.wrapper}>
            <Container maxWidth="lg" >
                <Grid container alignItems="center" maxWidth="lg" className={classes.root}>
                    <Grid item xs={12} md={4} >
                        <Login />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <div style={{ textAlign: "right" }} className={classes.description}>
                            <Typography variant="h1" className="header" style={{ color: "#ffe9a3", fontWeight: 500 }}>
                                Zealousy
                            </Typography>
                            <Typography variant="h4" gutterBottom style={{ color: 'white' }}>
                                We make your work more organized
                            </Typography>
                            <Box className={classes.buttons}>
                                <Link to="/" style={{ textDecoration: "none" }}>
                                    <Button variant="outlined" className="active" >
                                        Sign Up
                                    </Button>
                                </Link>
                                <Button variant="outlined" >
                                    Learn More
                                </Button>
                            </Box>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(LoginLanding)