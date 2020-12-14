const connection = require('../helpers/config');
const express = require('express');
const router = express.Router();

router.post('/signup', (req, res, next) => {
    const { email, password, name, lastname } = req.body;

    connection.query(
        'INSERT INTO users (email, password, name, lastname) VALUES (?, ?, ?, ?)',
        [email, password, name, lastname],
        (err, results) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send('I am in POST signup');
            }
        }
    );
});

module.exports = router;
