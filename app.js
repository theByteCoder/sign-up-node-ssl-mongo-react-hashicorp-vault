require('dotenv').config()

const cors = require('cors')
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT
const mongoUri = process.env.MONGO_URI

const bookSchema = require('./models/Books')
const authorSchema = require('./models/Author')

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use('/', require(path.join(__dirname, 'routes/blog')))

mongoose.connect(mongoUri,
    {useNewUrlParser: true, useUnifiedTopology: true}
).then(() => console.log(`Mongo connected to ${mongoUri}`))
    .catch(err => {
        console.log(err)
        process.exit(1)
    })

app.post('/book/add', async (req, res) => {
    try {
        const book = new bookSchema({
            name: req.body.name,
            genre: req.body.genre,
            authorId: req.body.authorId,
        })
        const response = await book.save()
        res.json(response)
    } catch (err) {
        res.send({message: err.message})
    }
})

app.get('/book/get/:id', async (req, res) => {
    try {
        const book = await bookSchema.find({_id: req.params.id})
        res.json(book)
    } catch (err) {
        res.send({message: err.message})
    }
})

app.get('/book/get', async (req, res) => {
    try {
        const books = await bookSchema.find({})
        res.json(books)
    } catch (err) {
        res.send({message: err.message})
    }
})

app.get('/author/get/:id', async (req, res) => {
    try {
        const author = await authorSchema.find({_id: req.params.id})
        res.json(author)
    } catch (err) {
        res.send({message: err.message})
    }
})

app.post('/author/add', async (req, res) => {
    try {
        const author = new authorSchema({
            name: req.params.name,
            age: req.params.age,
        })
        const response = await author.save()
        res.json(response)
    } catch (err) {
        res.send({message: err.message})
    }
})

app.get('/author/get', async (req, res) => {
    try {
        const author = await authorSchema.find({})
        res.json(author)
    } catch (err) {
        res.send({message: err.message})
    }
})

app.listen(port, () => {
    console.log(`Express listening to port ${port}`)
})