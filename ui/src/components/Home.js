import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Paper, Button, IconButton, Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import Toast from './Toast'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    linkBtn: {
        fontWeight: 'bold',
        '&:hover': {
            color: 'red',
        },
    },
    buttons: {
        width: "50%"
    },
    btnSubscribe: {
        backgroundColor: 'red',
        fontWeight: 'bold',
        '&:hover': {
            color: 'red',
        },
    },
    grids: {
        flex: 1,
    }
}));

const Home = () => {
    const classes = useStyles();
    const history = useHistory();

    const [loggedIn, setLoggedIn] = useState(false)
    const [showToast, setShowToast] = useState(false)

    const handleToastClose = () => {
        setShowToast(false)
    }

    const handleHistoryPush = (path) => {
        history.push(path)
    }

    const handleLogout = () => {
        window.sessionStorage.removeItem('_user');
        setLoggedIn(false)
        handleHistoryPush('/')
    }

    useEffect(() => {
        if (window.sessionStorage.getItem("_user")) {
            setLoggedIn(true)
            setShowToast(true)
        } else {
            setLoggedIn(false)
        }
    }, [])

    return (
        <div className={classes.root}>
            {showToast && <Toast open={showToast} message="Welcome to Hoichoi"
                severity="success" handleClose={handleToastClose} />}
            <AppBar position="static"
                style={{ backgroundColor: 'black' }}>
                <Toolbar>
                    <Grid className={classes.grids}>
                        <IconButton edge="start"
                            className={classes.menuButton}
                            color="inherit" aria-label="menu"
                            onClick={() => handleHistoryPush('/')} >
                            <Paper variant="outlined"
                                style={{ backgroundColor: 'black' }}>
                                <img
                                    src="https://appcmsprod.viewlift.com/7fa0ea9a-9799-4417-99f5-cbb5343c551d/images/Hoichoi-Logo_Red_140x40.png"
                                    alt="Logo" />
                            </Paper>
                        </IconButton>
                    </Grid>
                    <Grid className={classes.grids}>
                        <Button color="inherit"
                            className={classes.linkBtn}
                            onClick={() => handleHistoryPush('/')} >Home</Button>
                        <Button color="inherit"
                            className={classes.linkBtn} >Shows</Button>
                        <Button color="inherit"
                            className={classes.linkBtn} >Movies</Button>
                        <Button color="inherit"
                            className={classes.linkBtn} >Free</Button>
                        <Button color="inherit"
                            className={classes.linkBtn} >Refer and income</Button>
                    </Grid>
                    <Grid className={classes.grids}>
                        {!loggedIn && <Button color="inherit"
                            className={classes.linkBtn}
                            onClick={() => handleHistoryPush('/login')} >Login</Button>}
                        {!loggedIn && <Button color="inherit" id="btn-subscribe"
                            className={classes.btnSubscribe}
                            onClick={() => handleHistoryPush('/subscribe')} >Subscribe</Button>}
                        {loggedIn && <Button color="inherit" id="btn-subscribe"
                            className={classes.btnSubscribe}
                            onClick={handleLogout} >Logout</Button>}
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Home