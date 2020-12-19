const connection = require('./config');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false,
        },
        (email, password, cb) => {
            connection.query(
                'SELECT * FROM users WHERE email = ?',
                email,
                (err, results) => {
                    if (err) {
                        return cb(err);
                    } else {
                        if (results[0] == undefined) {
                            return cb(null, false, {
                                message: 'Incorrect email or password.',
                            });
                        } else if (
                            bcrypt.compareSync(password, results[0].password)
                        ) {
                            const user = {
                                email: email,
                            };
                            return cb(null, user, {
                                message: 'User sign in!',
                            });
                        } else {
                            return cb(null, false, {
                                message: 'Incorrect password.',
                            });
                        }
                    }
                }
            );
        }
    )
);

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET,
        },
        function (jwtPayload, cb) {
            return cb(null, jwtPayload);
        }
    )
);

module.exports = passport;
