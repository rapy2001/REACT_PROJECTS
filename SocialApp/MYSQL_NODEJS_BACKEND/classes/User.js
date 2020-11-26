const mysql = require('mysql');

const connection = mysql.createConnection({
    user:'root',
    password:'',
    database:'small_projects',
    host:'localhost'
});

connection.connect((err) => {
    if(err)
        console.log(err.message);
    else 
        console.log(connection.state);
});

let obj = null;
class User
{
    static createObj()
    {
        obj = obj === null ? new User() : obj; 
        return obj;
    }
    getUserByUsername = async (username) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'SELECT * FROM users WHERE username = ?';
                connection.query(query,[username],(err,results) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        if(results.length > 0)
                        {
                            resolve({flg:1,user:results[0]});
                        }
                        else
                        {
                            resolve({flg:0});
                        }
                    }
                })
            });
            return promise;
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    }
    insertUser = async (username,password,image,description) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'INSERT INTO users (username,password,image,description) VALUES (?,?,?,?)';
                connection.query(query,[username,password,image,description],(err,result) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        if(result.affectedRows > 0)
                        {
                            resolve({flg:1});
                        }
                        else
                        {
                            resolve({flg:0});
                        }
                    }
                });
                return promise;
            });
        }
        catch(err)
        {
            console.log(err.message);
            return err;
        }
    }
}

module.exports = User;