import { useEffect, useState } from 'react'
import { Button, TextField, Typography, Grid } from "@material-ui/core"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { makeStyles } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'
import Toast from './Toast'

// import vault from './Vault'
const Crypto = require('cryptr')

const useStyles = makeStyles({
    root: {
        margin: 20,
    },
    gridContainer: {
        padding: 10,
        backgroundColor: "#333"
    },
    typoHeader: {
        color: "#fff"
    },
    inputBox: {
        whiteSpace: 'pre',
        margin: 10,
        background: "#fff"

    },
    btnSubscribe: {
        backgroundColor: "red",
        '&:disabled': {
            background: "#fff",
            fontWeight: 'bold',
            color: 'red',
            textDecoration: "line-through",
        },
    },
    btnBack: {
        backgroundColor: "red",
        position: "absolute",
        left: 10,
    }
})

const Login = () => {
    const classes = useStyles()
    const history = useHistory();

    const key = process.env.REACT_APP_SECRET_KEY
    const cartographer = new Crypto(key);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [toastSeverity, setToastSeverity] = useState("")
    const [disableSubmit, setDisableSubmit] = useState(true)

    const handleToastClose = () => {
        setShowToast(false)
    }

    const handleReset = () => {
        setEmail("")
        setPassword("")
        setDisableSubmit(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setDisableSubmit(true)
        fetch(`https://localhost:2000/users/${email}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "password": cartographer.encrypt(password)
            })
        }).then(res => res.json()).then(data => {
            if (data.result.hasOwnProperty("error")) {
                setToastMessage(data.result.error)
                setToastSeverity("error")
                setShowToast(true)
            } else {
                window.sessionStorage.setItem("_user", data.result.success.id);
                history.push('/')
            }
        }).catch(err => {
            setToastMessage(err.result.error)
            setToastSeverity("error")
            setShowToast(true)
        }).finally(() => {
            handleReset()
        })
    }

    useEffect(() => {
        if (email.length && password.length) {
            setDisableSubmit(false)
        }
    }, [email.length, password.length])

    return <div className={classes.root}>
        <Button className={classes.btnBack}
            variant="contained" color="primary"
            disableElevation onClick={() => { history.push('/') }}>
            <ArrowBackIosIcon />
            Home
        </Button>
        {showToast && <Toast open={showToast} message={toastMessage}
            severity={toastSeverity} handleClose={handleToastClose} />}
        <Grid className={classes.gridContainer}>
            <form onSubmit={handleSubmit}>
                <Grid>
                    <Typography variant="h4"
                        className={classes.typoHeader}
                        component="h5" gutterBottom>
                        Login
                    </Typography>
                </Grid>
                <Grid>
                    <TextField className={classes.inputBox}
                        id="outlined-email" label="Email"
                        variant="filled" type="text" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="username" />
                </Grid>
                <Grid>
                    <TextField className={classes.inputBox}
                        id="outlined-pwd" label="Password"
                        variant="filled" type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password" />
                </Grid>
                <Grid>
                    <Button className={classes.btnSubscribe}
                        variant="contained" color="primary"
                        disableElevation type="submit"
                        disabled={disableSubmit} >
                        Login
                    </Button>
                </Grid>
            </form>
        </Grid>
    </div>
}

export default Login