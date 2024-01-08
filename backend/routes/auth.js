const express = require('express')
const authCtrl = require('../controllers/auth')

let router = express.Router()

router.use( (req, res, next) => {
    const event = new Date()
    console.log('AUTH Time:', event.toString())
    next()
})

router.post('/login', authCtrl.login)

module.exports = router