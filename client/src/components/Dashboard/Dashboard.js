import React, { useEffect } from 'react';
import clsx from 'clsx';
import { loadUser, logout } from '../../actions/auth'
import { loadTasks, addTask } from '../../actions/task'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Task from './Tasks/Task'
import LiveClock from './LiveClock'
import TaskForm from './TaskForm'

//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar'
import MainListItems from './listItems';
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    profile: {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    },
    avatar: {
        width: theme.spacing(16.25),
        height: theme.spacing(16.25)
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    },
    addIcon: {
        backgroundColor: "#ff971d",
        position: "absolute",
        bottom: theme.spacing(6),
        right: theme.spacing(6)
    }
}));



const Dashboard = ({ auth: { isAuthenticated, loading, user }, loadUser, logout, loadTasks, addTask }) => {



    const classes = useStyles();

    const [open, setOpen] = React.useState(true);
    const [hide, setHide] = React.useState(false)

    const handleDrawerOpen = () => {
        setOpen(true);
        setHide(false);
    };
    const handleDrawerClose = () => {
        setOpen(false);
        setHide(true);
    };


    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


    //IMPORTANT
    //react doesnt know if backend has already finished fetching data hence it will paint the jsx immedaitely
    //even if name and email is still undefined. thats why we must have a LAODING state to keep track
    //otherwise it will result in name/email undefined and prevents redux actions from being dispatched

    useEffect(() => {
        loadUser()
        loadTasks()
    }, [loadUser])

    //@TODO Protect routes using the private route component
    // if (!isAuthenticated) {
    //     return <Redirect to="/login" />
    // }

    return loading ? (

        <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    ) : (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" style={{ backgroundColor: '#ff971d' }} className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Zealousy
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton onClick={e => logout()}>
                            <ExitToAppIcon style={{ color: "#fff" }} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    {
                        !hide && (
                            <React.Fragment>
                                <div className={classes.profile}>
                                    <Avatar src={`http://localhost:5000/api/users/${user._id}/avatar`} className={classes.avatar}>
                                    </Avatar>
                                    <Typography variant="h6">
                                        {user.name}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {user.email}
                                    </Typography>
                                </div>
                                <Divider />
                            </React.Fragment>
                        )
                    }

                    <List style={{ height: "100%" }}>
                        <MainListItems hide={hide} />
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <Tooltip title="Create a task" placement="left">
                        <Fab size="large" className={classes.addIcon}>
                            <AddIcon style={{ color: "white" }} />
                        </Fab>
                    </Tooltip>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            {/* Live Clock */}
                            <Grid item xs={12} md={4} >
                                <Paper className={fixedHeightPaper}>
                                    <LiveClock />
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={12} md={4} >
                                <Paper className={fixedHeightPaper}>
                                    test
                            </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Paper className={fixedHeightPaper}>
                                    test
                            </Paper>
                            </Grid>

                        </Grid>
                        <Grid container spacing={3} alignItems="stretch">
                            {/* Recent Orders */}
                            <Grid item xs={8}>
                                <Paper className={classes.paper} style={{ height: "100%" }}>
                                    <Task />
                                </Paper>
                            </Grid>
                            <Grid item xs={4}  >
                                <Paper className={classes.paper} style={{ height: "100%" }}>
                                    <TaskForm />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        );
}


const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps, { loadUser, logout, loadTasks, addTask })(Dashboard)