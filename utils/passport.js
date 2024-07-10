const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  const user = await User.findOne({ username });
  if (!user) return done(null, false);
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return done(null, false);
  return done(null, user);
}));