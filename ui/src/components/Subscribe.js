import { useState } from 'react'
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

const Subscribe = () => {
    const classes = useStyles()
    const history = useHistory();

    const key = process.env.REACT_APP_SECRET_KEY
    const cartographer = new Crypto(key);

    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [toastSeverity, setToastSeverity] = useState("")

    const handleToastClose = () => {
        setShowToast(false)
    }

    const handleReset = () => {
        setName("")
        setAge("")
        setEmail("")
        setPassword("")
    }

    const handleSubmit = () => {
        fetch('https://localhost:2000/users/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": cartographer.encrypt(name),
                "age": cartographer.encrypt(parseInt(age)),
                "email": cartographer.encrypt(email),
                "password": cartographer.encrypt(password)
            })
        }).then(res => res.json()).then(data => {
            if (data.message.hasOwnProperty("error")) {
                setToastMessage(data.message.error)
                setToastSeverity("error")
                setShowToast(true)
            } else {
                setToastMessage(data.message.success)
                setToastSeverity("success")
                setShowToast(true)
            }
        }).catch(err => {
            setToastMessage(err.message)
            setToastSeverity("error")
            setShowToast(true)
        }).finally(() => {
            handleReset()
        })

        /* vault.read('secret/credentials').then(async ({ data }) => {
  const key = new Crypto(data['cartographer']);
  const reqName = key.encrypt(name);
  const reqAge = key.encrypt(age);
  const reqEmail = key.encrypt(email);
  const reqPassword = key.encrypt(password);
  fetch('https://localhost:2000/users/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      "name": reqName,
      "age": reqAge,
      "email": reqEmail,
      "password": reqPassword
    }
  }).then(res => res.json()).then(data => {
    console.log(data);
  })
}) */
    }

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
                        Create Account
                    </Typography>
                    <TextField className={classes.inputBox}
                        id="outlined-name" label="Name"
                        variant="filled" type="text" value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Grid>
                    </Grid>
                    <TextField className={classes.inputBox}
                        id="outlined-age" label="Age"
                        variant="filled" type="text" value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <Grid>
                    </Grid>
                    <TextField className={classes.inputBox}
                        id="outlined-email" label="Email"
                        variant="filled" type="text" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
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
                        disabled={!name.length
                            || !age.length
                            || !email.length
                            || !password.length} >
                        Subscribe
                    </Button>
                </Grid>
            </form>
        </Grid>
    </div>
}

export default Subscribe