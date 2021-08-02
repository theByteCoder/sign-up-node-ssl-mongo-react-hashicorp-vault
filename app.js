const dotEnv = require('dotenv')
const cors = require('cors')
const path = require('path')
const express = require('express')

dotEnv.config()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.static(path.join(__dirname, "public")))

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/index.html'))
})

app.get('/json', (req, res) => {
    res.json({"name": "Subhasish"})
    res.sendStatus(200)
})

app.get('/name/:id', (req, res) => {
    res.json({"id": req.params.id})
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/about.html'))
})

app.listen(port, () => {
    console.log(`Express listening http://localhost:${port}`)
})