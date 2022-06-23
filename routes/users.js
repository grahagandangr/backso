const express = require('express')
const router = express.Router()
const Controller = require('../controllers')

router.get('/', Controller.listUsers)
router.get('/:id/delete', Controller.deleteUser)

module.exports = router