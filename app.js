const dotEnv = require('dotenv')
const cors = require('cors')
const path
    = require('path')
const express = require('express')
const app = express()

dotEnv.config()

const port = process.env.PORT

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'))
})

app.listen(port, () => {
    console.log(`Express listening http://localhost:${port}`)
})