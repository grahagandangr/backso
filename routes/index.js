const express = require('express')
const router = express.Router()
const usersRoute = require('./users')
const profilesRoute = require('./profiles')
const postsRoute = require('./profiles')
const Controller = require('../controllers')
const { isLogin, isAdmin } = require('../middleware/auth')

//  get register
router.get('/register', Controller.register)
//  post register
router.post('/register', Controller.registerPost)
//  get login
router.get('/login', Controller.login)
//  post login
router.post('/login', Controller.loginPost)

router.get('/logout', Controller.logout)

// router.use((req, res, next) => {
//   if (!req.session.userId) {
//     const error = 'login dulu ngab'
//     res.redirect(`/login?error=${error}`)
//   } else {
//     next()
//   }
// })

router.get('/', isLogin, isAdmin,  Controller.home)

// router.use((req, res, next) => {
//   console.log(req.session)
//   if (req.session.userId && req.session.role != 'admin') {
//     const error = 'Ga boleh akses ngabbb'
//     res.redirect(`/login?error=${error}`)
//   } else {
//     next()
//   }
// })



router.use('/users', usersRoute)
router.use('/profiles', profilesRoute)
router.use('/posts', postsRoute)

module.exports = router