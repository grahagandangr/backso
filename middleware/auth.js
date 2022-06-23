const isLogin = (req, res, next) => {
  if (!req.session.userId) {
    const error = 'login dulu ngab'
    res.redirect(`/login?error=${error}`)
  } else {
    next()
  }
}

const isAdmin = (req, res, next) => {
  if (req.session.userId && req.session.role != 'admin') {
    const error = 'Ga boleh akses ngabbb'
    res.redirect(`/login?error=${error}`)
  } else {
    next()
  }
}

module.exports = { isLogin, isAdmin }