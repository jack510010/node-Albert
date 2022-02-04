require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
});

module.exports = pool.promise(); // 滙出 promise pool

// mysql.createConnection() 是建立一個單一的連線
// mysql.createPool()  一個連線詞的概念
// waitForConnections  要不要等待
// connectionLimit  最大連線數
// queueLimit  排隊