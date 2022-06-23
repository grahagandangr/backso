const { Post, Profile, User } = require('../models')
const { Op } = require("sequelize")
const Quote = require('inspirational-quotes')
const bcryptjs = require('bcryptjs')
const formatDate  = require('../helpers/formatDate')
const { post } = require('../routes')

class Controller {
  static home(req, res) {
    Post.findAll({
      include: [{
        model: User,
        include: Profile
      }]
    })
      .then((posts) => {
        res.send(posts)
        let quote = Quote.getQuote()
        // res.render('home', { quote } )
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

  static addPost(req, res) {
    const errors = req.query.errors
    res.render('add-post-form', { errors })
  }

  static addPostPost(req, res) {
    const id = req.session.userId
    const { title, imgUrl, description, repository } = req.body
    const newPost = { title, imgUrl, description, repository, UserId: id }
    Post.create(newPost)
      .then(() => {
        res.redirect(`/`)
      })
      .catch((err) => {
        if (err.name === 'SequelizeValidationError') {
          let errors = err.errors.map((el) => {
            return el.message
          })
          res.redirect(`/posts/add?errors=${errors}`)
        } 
        else res.send(err)
      })
  }

  static updatePost(req, res) {
    const errors = req.query.errors
    const { id } = req.params
    Post.findByPk(id)
      .then((post) => {
        res.render('edit-post-form', { post, errors })
      })
  }

  static updatePostPost(req, res) {
    const { id } = req.params
    const UserId = req.session.userId
    const { title, imgUrl, description, repository } = req.body
    const updatedPost = { title, imgUrl, description, repository, UserId }
    console.log(updatedPost);
    Post.update(updatedPost, { where: { id } })
      .then(() => {
        res.redirect(`/`)
      })
      .catch((err) => {
        if (err.name === 'SequelizeValidationError') {
          let errors = err.errors.map((el) => {
            return el.message
          })
          res.redirect(`/posts/${id}/edit?errors=${errors}`)
        } 
        else res.send(err)
      })
  }


}

module.exports = Controller