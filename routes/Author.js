const express = require('express')
const router = express.Router()
const authorSchema = require('../models/Author')

router.post('/add', async (req, res) => {
    try {
        const author = new authorSchema({
            name: req.params.name,
            age: req.params.age,
        })
        const response = await author.save()
        res.json({result: response})
    } catch (err) {
        res.send({message: err.message})
    }
})

router.get('/get/:id', async (req, res) => {
    try {
        const response = await authorSchema.find({_id: req.params.id})
        res.json({result: response})
    } catch (err) {
        res.send({message: err.message})
    }
})

router.get('/get', async (req, res) => {
    try {
        const response = await authorSchema.find({})
        res.json({result: response})
    } catch (err) {
        res.send({message: err.message})
    }
})

module.exports = router