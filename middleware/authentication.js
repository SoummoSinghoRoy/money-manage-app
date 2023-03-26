const passport = require('./passport');

exports.passportAuthentication = (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if(err) {
      return next(err)
    }
    if(!user) {
      return res.status(401).json({
        Message: "Authorization failed"
      })
    }
    if(info) {
      console.log(info);
    }
    req.user = user
    next()
  })(req, res, next)
}

