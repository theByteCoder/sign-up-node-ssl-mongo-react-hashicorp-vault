const express = require('express')
const router = express.Router()
const bookSchema = require('../models/Book')

router.post('/add', async (req, res) => {
    try {
        const book = new bookSchema({
            name: req.body.name,
            genre: req.body.genre,
            authorId: req.body.authorId,
        })
        const response = await book.save()
        res.json({result: response})
    } catch (err) {
        res.send({message: err.message})
    }
})

router.get('/get/:id', async (req, res) => {
    try {
        const response = await bookSchema.find({_id: req.params.id})
        res.json({result: response})
    } catch (err) {
        res.send({message: err.message})
    }
})

router.get('/get', async (req, res) => {
    try {
        const response = await bookSchema.find({})
        res.json({result: response})
    } catch (err) {
        res.send({message: err.message})
    }
})

module.exports = router