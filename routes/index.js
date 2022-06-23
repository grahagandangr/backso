const express = require('express')
const router = express.Router()
const usersRoute = require('./users')
const profilesRoute = require('./profiles')
const postsRoute = require('./posts')
const Controller = require('../controllers')
const { isLogin, isAdmin } = require('../middleware/auth')


router.get('/register', Controller.register)
router.post('/register', Controller.registerPost)
router.get('/login', Controller.login)
router.post('/login', Controller.loginPost)

router.get('/register/profile/:id', Controller.addProfile)
router.post('/register/profile/:id', Controller.addProfilePost)
router.get('/', Controller.home)
router.use('/users', isLogin, isAdmin, usersRoute)
router.use('/profiles', isLogin, profilesRoute)
router.use('/posts', isLogin, postsRoute)
router.get('/logout', isLogin, Controller.logout)

module.exports = router