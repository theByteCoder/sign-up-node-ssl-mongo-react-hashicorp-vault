const express = require('express')
const router = express.Router()
const userSchema = require('../models/Users')
const Crypto = require('cryptr');
const key = process.env.SECRET_KEY
const cartographer = new Crypto(key);
// const vault = require('../volumes/Vault')

// create user
router.post('/', async (req, res) => {
    if (!res.headersSent) {
        const email = cartographer.decrypt(req.body.email)
        const found = await userSchema.find({email})
        if (!found.length) {
            try {
                const user = new userSchema({
                    name: cartographer.decrypt(req.body.name),
                    age: cartographer.decrypt(req.body.age),
                    email,
                    password: req.body.password,
                })
                const response = await user.save()
                res.json({result: {success: `Congratulation ${email}, you are now a part of Hoichoi.`}})
            } catch (err) {
                res.send({result: {error: err.message}})
            }
        } else {
            res.send({result: {error: `${email} is already subscribed.`}})
        }
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
        res.send({result: {error : err.message}})
    }*/
})

// login with user
router.post('/:email', async (req, res) => {
    if (!res.headersSent) {
        const email = req.params.email
        const found = await userSchema.find({email})
        if (found.length) {
            try {
                const reqPassword = cartographer.decrypt(req.body.password)
                const savedPassword = cartographer.decrypt(found[0].password)
                if (reqPassword === savedPassword) {
                    res.json({
                        result: {
                            success: {
                                id: found[0]._id,
                                name: found[0].name,
                                age: found[0].age,
                                email: found[0].email,
                            }
                        }
                    })
                } else {
                    res.send({result: {error: 'Invalid password.'}})
                }
            } catch (err) {
                res.send({result: {error: err.message}})
            }
        } else {
            res.send({result: {error: `${email} is not subscribed.`}})
        }
    }
})

// get user with id
router.get('/:id', async (req, res) => {
    if (!res.headersSent) {
        try {
            const response = await userSchema.find({_id: req.params.id})
            res.json({result: {success: response}})
        } catch (err) {
            res.send({result: {error: err.message}})
        }
    }
})

// get list of all users
router.get('/', async (req, res) => {
    if (!res.headersSent) {
        try {
            const response = await userSchema.find({})
            res.json({result: {success: response}})
        } catch (err) {
            res.send({result: {error: err.message}})
        }
    }
})

module.exports = router