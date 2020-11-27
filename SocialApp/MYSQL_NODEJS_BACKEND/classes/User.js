const mysql = require('mysql');

const connection = mysql.createConnection({
    user:'root',
    password:'',
    database:'social_app',
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
            console.log('error while getting the user by username ' + err);
            return err;
        }
    }
    insertUser = async (username,password,image,description) => {
        try
        {
            let response = await this.getUserByUsername(username);
            // console.log(response);
            if(response.flg === 1)
            {
                let promise = new Promise((resolve,reject) => {
                    resolve({flg:2});
                })
                return promise;
            }
            else
            {
                let promise = await new Promise((resolve,reject) => {
                    let query = 'INSERT INTO users VALUES (0,?,?,?,?)';
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
                });
                return promise;
            }
            
        }
        catch(err)
        {
            console.log('Error while inserting user ' + err.message);
            return err;
        }
    }

    getUsers = async (userId) => {
        try
        {   
            let promise = await new Promise((resolve,reject) => {
                let query = 'SELECT * FROM users';
                connection.query(query,async (err,results) => {
                    if(err)
                    {
                        resolve(new Error(err.message));
                    }
                    else
                    {
                        let users = results;
                        for(let i = 0; i<results.length; i++)
                        {
                            let promise1 = await new Promise((resolve,reject) => {
                                let query = 'SELECT * FROM friend WHERE user_id = ? AND friend_id = ? OR user_id = ? AND friend_id = ?';
                                connection.query(query,[userId,results[i].user_id,results[i].user_id,userId],(err,result) => {
                                    if(err)
                                    {
                                       reject(new Error(err.message)); 
                                    }
                                    else
                                    {
                                        // console.log(result);
                                        if(result.length > 0)
                                        {
                                            resolve({flg:1});
                                        }
                                        else
                                        {
                                            resolve({flg:0});
                                        }
                                    }
                                })
                            })
                            let promise2 = await new Promise((resolve,reject) => {
                                let query = 'SELECT * FROM requests WHERE from_id = ? AND to_id = ? OR from_id = ? AND to_id = ?';
                                connection.query(query,[userId,results[i].user_id,results[i].user_id,userId],(err,result) => {
                                    if(err)
                                    {
                                       reject(new Error(err.message)); 
                                    }
                                    else
                                    {
                                        // console.log(result);
                                        if(result.length > 0)
                                        {
                                            resolve({flg:1});
                                        }
                                        else
                                        {
                                            resolve({flg:0});
                                        }
                                    }
                                })
                            })
                            if(promise1.flg === 1 || promise2.flg === 1)
                            {
                                users[i]['status'] = 1;
                            }
                            else
                            {
                                users[i]['status'] = 0;
                            }
                        }
                        resolve({flg:1,users:users});
                    }
                })
            })
            return promise;
        }
        catch(err)
        {
            console.log('error while getting the users ' + err.message);
            return err;
        }
    }
}

module.exports = User;