const connection = require('../helpers/config');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
    const { email, password, name, lastname } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);

    connection.query(
        'INSERT INTO users (email, password, name, lastname) VALUES (?, ?, ?, ?)',
        [email, passwordHash, name, lastname],
        (err) => {
            if (err) {
                res.status(500).json({
                    flash: 'An error has occurred.',
                });
            } else {
                res.status(200).json({
                    flash: 'User has been signed up !!!',
                });
            }
        }
    );
});

router.post('/signin', (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ flash: 'An error has occurred.' });
        }

        if (!user) {
            return res
                .status(400)
                .json({ flash: 'your login details are wrong' });
        }

        const token = jwt.sign(user, process.env.SECRET);
        return res.json({ user, token, flash: 'User connected' });
    })(req, res);
});

module.exports = router;
