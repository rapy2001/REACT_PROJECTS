const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'LMS'
});

connection.connect(err => {
    if(err)
    {
        console.log(err.message);
    }
    else
    {
        console.log(connection.state);
    }
});

module.exports = connection;