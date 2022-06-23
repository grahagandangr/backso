const express = require('express')
const router = express.Router()
const Controller = require('../controllers')

router.get('/add', Controller.addPost)
router.post('/add', Controller.addPostPost)

module.exports = router