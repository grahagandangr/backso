const { Post, Profile, User } = require('../models')
const { Op } = require("sequelize")
const Quote = require('inspirational-quotes')
const bcryptjs = require('bcryptjs')

class Controller {
  static home(req, res) {
    Post.findAll()
      .then((posts) => {
        let quote = Quote.getQuote()
        res.render('home', { quote } )
      })
      .catch((err) => {
        res.send(err)
      })
  }
  static register(req, res) {
    const errors = req.query.errors
    res.render('register-form', { errors })
  }

  static registerPost(req, res) {
    const { username, email, password} = req.body
    const newUser = { username, email, password }
    User.create(newUser, { returning: true })
      .then((user) => {
        res.redirect(`/register/profile/${user.id}`)
      })
      .catch((err) => {
        if (err.name === 'SequelizeValidationError') {
          let errors = err.errors.map((el) => {
            return el.message
          })
          res.redirect(`/register?errors=${errors}`)
        } 
        else res.send(err)
      })
  }

  static addProfile(req, res) {
    const { id } = req.params
    res.render('profile-form', { id })
  }

  static addProfilePost(req, res) {
    const { id } = req.params
    const { name, bio, profilePicture } = req.body
    const newProfile = { name, bio, profilePicture, UserId: id }
    Profile.create(newProfile)
      .then(() => {
        res.redirect('/login')
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static login(req, res) {
    const { error } = req.query
    res.render('login-form', { error })
  }

  static loginPost(req, res) {
    const { username, password } = req.body
    User.findOne({
      where: { username }
    })
      .then((user) => {
        if (user) {
          const isValidPassword = bcryptjs.compareSync(password, user.password)
          if (isValidPassword) {
            req.session.userId = user.id
            req.session.role = user.role
            return res.redirect('/')
          } else {
            const error = 'invalid username/password'
            return res.redirect(`/login?error=${error}`)
          }
        } else {
          const error = 'invalid username/password'
          return res.redirect(`/login?error=${error}`)
        }
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect('/login');
      }
    });
  }
}

module.exports = Controller