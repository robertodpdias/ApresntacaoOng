require('dotenv').config();
const mysql = require('mysql');

const con = mysql.createConnection({
    'user': process.env.USER,
    'database': process.env.DATABASE,
    'host': process.env.HOST,
    'connectionLimit': 150,
    'queueLimit': 300,
    'acquireTimeout': 1000000
})

module.exports = {
    con
}