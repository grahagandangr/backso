const { Post, Profile, User } = require('../models')
const { Op } = require("sequelize")
const Quote = require('inspirational-quotes')
const bcryptjs = require('bcryptjs')

class Controller {
  static home(req, res) {
    Post.findAll()
      .then((posts) => {
        let quote = Quote.getQuote()
        res.send(quote)
      })
      .catch((err) => {
        res.send(err)
      })
  }
  static register(req, res) {
    res.render('register-form')
  }

  static registerPost(req, res) {
    const { username, email, password, role } = req.body
    const newUser = { username, email, password, role }
    User.create(newUser)
      .then((user) => {
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