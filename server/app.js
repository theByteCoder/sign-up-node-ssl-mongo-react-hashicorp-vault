require('dotenv').config()

const cors = require('cors')
const path = require('path')
const fs = require('fs')
const express = require('express')
const https = require('https')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT
const mongoUri = process.env.MONGO_URI

app.use(cors({origin: 'https://localhost:3000'}))
app.use((req, res, next) => {
    const ua = req.headers['user-agent'];
    if (ua.toString().toLowerCase().startsWith("postman")) {
        res.status(500)
    }
    next()
})
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use('/users', require(path.join(__dirname, 'routes/Users')))

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
}, app)

mongoose.connect(mongoUri,
    {useNewUrlParser: true, useUnifiedTopology: true}
).then(() => console.log(`Mongo connected to ${mongoUri}`))
    .catch(err => {
        console.log(err)
        process.exit(1)
    })

sslServer.listen(port, () => {
    console.log(`Express listening to secure server port ${port}`)
})