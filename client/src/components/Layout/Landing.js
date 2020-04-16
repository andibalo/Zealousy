import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography, makeStyles, Button, Box, Container } from '@material-ui/core'
import Register from '../auth/Register'



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
            left: 0,
            height: "100%",
            width: "60%",
            backgroundColor: "#ff971d",
            zIndex: -1
        }
    },


}))

const Landing = props => {

    const classes = useStyles()

    return (
        <Box className={classes.wrapper}>
            <Container maxWidth="lg" >
                <Grid container alignItems="center" maxWidth="lg" className={classes.root}>
                    <Grid item xs={12} md={8} >
                        <div style={{ maxWidth: "600px" }} className={classes.description}>
                            <Typography variant="h1" className="header" style={{ color: "#ffe9a3", fontWeight: 500 }}>
                                Zealousy
                            </Typography>
                            <Typography variant="h4" gutterBottom style={{ color: 'white' }}>
                                We make your work more organized
                            </Typography>
                            <Box className={classes.buttons}>
                                <Button variant="outlined" className="active">
                                    Log In
                                </Button>
                                <Button variant="outlined" >
                                    Learn More
                                </Button>
                            </Box>

                        </div>

                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Register />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

Landing.propTypes = {

}

export default Landing
