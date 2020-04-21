import React from "react";
// import { Link } from 'react-router-dom'
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import HelpIcon from "@material-ui/icons/Help";
import CancelIcon from "@material-ui/icons/Cancel";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core";

function Copyright() {
    return (
        <React.Fragment>
            <Typography variant="body2" color="textSecondary" align="center">
                {"Copyright © "}

                {new Date().getFullYear()}
                {"."}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
                By{" "}
                <Link color="inherit" href="https://github.com/andibalo213" target="_blank">
                    Andi Usman Balo
                </Link>
            </Typography>
        </React.Fragment>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "inherit",
    },
    copyright: {
        marginTop: "auto",
        paddingBottom: theme.spacing(4),
    },
    deleteItem: {
        color: "#e53935"
    }
}));

const MainListItems = ({ hide }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button>
                <ListItemIcon>
                    <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Account Details" />
            </ListItem>

            <ListItem button>
                <ListItemIcon>
                    <HelpIcon />
                </ListItemIcon>
                <ListItemText primary="Customer Support" />
            </ListItem>
            <ListItem button>
                <ListItemIcon className={classes.deleteItem}>
                    <CancelIcon />
                </ListItemIcon>
                <ListItemText primary="Delete Account" style={{ color: "#e53935" }} />
            </ListItem>
            {!hide && (
                <Box className={classes.copyright}>
                    <Copyright />
                </Box>
            )}
        </div>
    );
};

export default MainListItems;
