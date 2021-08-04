const express = require('express')
const router = express.Router()
const userSchema = require('../models/Users')
const Crypto = require('cryptr');
const key = process.env.SECRET_KEY
const cartographer = new Crypto(key);
// const vault = require('../volumes/Vault')

router.post('/', async (req, res) => {
    try {
        const user = new userSchema({
            name: cartographer.decrypt(req.body.name),
            age: cartographer.decrypt(req.body.age),
            email: cartographer.decrypt(req.body.email),
            password: req.body.password,
        })
        const response = await user.save()
        res.json({ result: response })
    } catch (err) {
        res.send({ message: err.message })
    }

    /*try {
        vault.read('secret/credentials').then(async ({data}) => {
            const key = new Crypto(data['cartographer']);
            const name = key.decrypt(req.body.name);
            const age = key.decrypt(req.body.age);
            const email = key.decrypt(req.body.email);
            const user = new userSchema({
                name: name,
                age: age,
                email: email,
                password: req.body.password,
            })
            const response = await user.save()
            res.json({result: response})
        })
    } catch (err) {
        res.send({message: err.message})
    }*/
})

router.get('/:id', async (req, res) => {
    try {
        const response = await userSchema.find({ _id: req.params.id })
        res.json({ result: response })
    } catch (err) {
        res.send({ message: err.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const response = await userSchema.find({})
        res.json({ result: response })
    } catch (err) {
        res.send({ message: err.message })
    }
})

module.exports = router