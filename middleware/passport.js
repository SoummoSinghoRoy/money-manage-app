const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../model/User');
const config = require('config');


let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.get("secret");

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await User.findOne({_id: jwt_payload._id})
    
    if(!user) {
      return done(null, false, { message: 'Incorrect email.' })
    }
    return done(null, user)
  } catch (error) {
    done(error)
  }
}))

module.exports = passport;