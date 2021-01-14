const mysql = require('mysql');
const  connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'entertainment'
})

connection.on('connection',(err) => {
    console.log('error');
})
module.exports = connection;