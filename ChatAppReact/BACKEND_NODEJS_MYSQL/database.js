const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'chat'
})
let obj = null;
connection.connect((err) => {
    if(err)
        console.log(err.message);
    else
        console.log(connection.state);
})


class Database
{
    static createObj()
    {
        obj === null ? obj = new Database() : null;
        return obj;
    }
    checkUserByUsername =async (username) => {
       try
       {
            let response = await new Promise((resolve,reject) => {
                let query = 'SELECT * FROM users WHERE username = ?';
                connection.query(query,[username],(err,results) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        resolve(results);
                    }
                })
            })
            return response;
       }
       catch(err)
       {
           return err;
       }
        
    }
    register = async (username,password,image) =>{
        let result = await this.checkUserByUsername(username);
        if(result.length > 0)
        {
            let promise = new Promise((resolve,reject) => {
                resolve({flg:2})
            })
            // console.log(promise);
            return promise;
        }
        else
        {
            try
            {
                let response = await new Promise((resolve,reject) => {
                    let query = 'INSERT INTO users(username,password,image) VALUES (?,?,?)';
                    connection.query(query,[username,password,image],(err,results) => {
                        if(err)
                        {
                            reject(new Error(err.message));
                        }
                        else
                        {
                            if(results.affectedRows === 1)
                            {
                                resolve({flg:1})
                            }
                            else
                            {
                                resolve({flg:0})
                            }
                        }
                    })
                })
                return response;
                
            }
            catch(err)
            {
                return err;
            }
        }
    }
    getUserByUsername = async (username) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'SELECT * FROM users WHERE username=?';
                connection.query(query,[username],(err,result) => {
                    if(err)
                    {
                        reject({flg:-1})
                    }
                    else
                    {
                        if(result.length > 0)
                            resolve({flg:1,user:result[0]});
                        else
                            resolve({flg:0})
                    }
                })
            });
            return promise;
           
        }
        catch(err)
        {
            return err;
        }
    }
    logIn = async (userId) => {
        try
        {
            let promise = new Promise((resolve,reject) => {
                let query = 'UPDATE users SET log_status = 1 WHERE user_id = ?';
                connection.query(query,[userId],(err,result) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        if(result.affectedRows === 1 )
                        {
                            resolve({flg:1});
                        }
                        else
                        {
                            resolve({flg:0})
                        }
                    }
                })
                
            })
            return promise;
        }
        catch(err)
        {
            return err;
        }
    }
}

module.exports =  Database;