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
                res.status(500).json({ flash:  "erreur de user" });
            } else {
                res.status(200).json({ flash:  "User has been signed up !" });
            }
        }
    );
});

module.exports = router;
