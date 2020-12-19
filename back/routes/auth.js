const connection = require('../helpers/config');
const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
    const { email, password, name, lastname } = req.body;

    connection.query(
        'INSERT INTO users (email, password, name, lastname) VALUES (?, ?, ?, ?)',
        [email, password, name, lastname],
        (err, results) => {
            if (err) {
                res.status(500).json({ flash: 'erreur de user' });
            } else {
                res.status(200).json({ flash: 'User has been signed up !' });
            }
        }
    );
});

router.get('/signin', (req, res) => {
    const { email, password } = req.query;

    connection.query(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (err, results) => {
            if (err) {
                res.status(500).json({ flash: 'erreur de user' });
            } else {
                if (results.length === 0) {
                    res.status(500).json({ flash: 'erreur de user' });
                } else {
                    res.status(200).json({ results, flash: 'User connected' });
                }
            }
        }
    );
});

module.exports = router;
