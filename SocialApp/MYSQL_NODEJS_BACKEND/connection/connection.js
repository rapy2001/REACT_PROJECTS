const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'social_app'
});

connection.connect((err) => {
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log(connection.state);
    }
})

module.exports = connection;