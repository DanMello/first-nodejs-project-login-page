exports.init = function (req, res) {
  
  res.render('pages/login' + req.filepath, {
    loginErrors: req.flash('loginErrors'),
    body: req.flash('body')
  })

}

exports.login = function (req, res, next) {

  req.assert('username', 'Username or email required*').notEmpty()
  req.assert('password', 'Password required*').notEmpty()

  req.getValidationResult().then(result => {

    if (!result.isEmpty()) {

      let error = result.array()[0]

      req.flash('loginErrors', error.msg)
      req.flash('body', req.body)
      res.redirect(req.route.path)

    } else {

      req._passport.instance.authenticate('local', {
        successRedirect: '/',
        failureRedirect: req.route.path
      })(req, res,next)

    }

  })

}

exports.logout = function(req, res, next) {

  req.session.destroy(function (err) {

    if (err) next(err) 
    else res.redirect('/')

  })

}
