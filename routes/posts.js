const express = require('express')
const router = express.Router()
const Controller = require('../controllers')

router.get('/add', Controller.addPost)
router.post('/add', Controller.addPostPost)
router.get('/:id/', Controller.detailPost)
router.get('/:id/edit', Controller.updatePost)
router.post('/:id/edit', Controller.updatePostPost)

module.exports = router