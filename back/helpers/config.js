const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const connexion = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    debug: true,
});

module.exports = connexion;
