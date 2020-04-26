import React from "react";
import { connect } from 'react-redux'
import { deleteAccount } from '../../actions/auth'


import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import HelpIcon from "@material-ui/icons/Help";
import CancelIcon from "@material-ui/icons/Cancel";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import LinkMaterial from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'

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
                <LinkMaterial color="inherit" href="https://github.com/andibalo213" target="_blank">
                    Andi Usman Balo
                </LinkMaterial>
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
    },
    deleteBtn: {
        backgroundColor: '#e53935',
        color: "#fff",
        '&:hover': {
            backgroundColor: 'rgb(216, 64, 60)'
        }
    }
}));

const MainListItems = ({ hide, deleteAccount }) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
            <ListItem button onClick={e => handleOpen(e)} >
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

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ color: "#e53935" }}>Deleting Your Account</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Once your account is deleted, you will not be able to get it back. Do you still want to delete your account?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Cancel
                    </Button>
                    <Button onClick={e => deleteAccount()} className={classes.deleteBtn} autoFocus variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default connect(null, { deleteAccount })(MainListItems);
