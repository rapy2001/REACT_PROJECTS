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

    getUsers = async (userId) => {
        try
        {
            let response = await new Promise((resolve,reject) => {
                let query = 'SELECT * FROM users';
                connection.query(query,(err,results) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        resolve(results);
                    }
                });
            });
            // console.log(response);
            try
            {
                for(let i = 0; i<response.length; i++ )
                {
                    let newResponse = await new Promise((resolve,reject) => {
                        let query = 'SELECT * FROM friends WHERE user_id = ? AND friend_id = ? OR user_id = ? AND friend_id = ?';
                        connection.query(query,[userId,response[i].user_id,response[i].user_id,userId],(err,result) => {
                            if(err)
                            {
                                reject(new Error(err.message));
                            }
                            else
                            {
                                resolve(result);
                            }
                        });
                    });
                    let newPromise = await new Promise((resolve,reject) => {
                        let query = 'SELECT * FROM requests WHERE from_id = ? AND to_id = ? OR from_Id= ? AND to_id = ?';
                        connection.query(query,[userId,response[i].user_id,response[i].user_id,userId],(err,result) => {
                            if(err)
                            {
                                reject(new Error(err.message));
                            }
                            else
                            {
                                resolve(result);
                            }
                        })
                    });
                    // console.log(newPromise.rowCount);
                    if(newResponse.length > 0 || newPromise.length > 0)
                    {
                        response[i]['status'] = 1;
                    }
                    else
                    {
                        response[i]['status'] = 0;
                    }
                }
                // console.log(response);
                return response;
                
            }
            catch(err)
            {
                console.log(err);
                return err;
            }
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    }

    sendFriendRequest = async (userId,friendId) => {
        try
        {
            let response = await new Promise((resolve,reject) => {
                let query = 'INSERT INTO requests VALUES(?,?);';
                connection.query(query,[userId,friendId],(err,result) => {
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
            return response;
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    }

    getFriends = async (userId) => {
        try
        {
            let promise = new Promise((resolve,reject) => {
                let query = 'SELECT users.user_id, users.username,users.image, users.log_status FROM users INNER JOIN friends ON users.user_id = friends.friend_id WHERE friends.user_id = ?';
                connection.query(query,[userId],(err,results) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        resolve({flg:1,users:results});
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

    getMessages = async (userId,friendId) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'SELECT * FROM messages WHERE from_id = ? AND to_id = ? OR from_id = ? AND to_id = ? ORDER BY created_at ASC';
                connection.query(query,[userId,friendId,friendId,userId],(err,results) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        resolve({flg:1,messages:results});
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

    addMessage = async (userId,friendId,message) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'INSERT INTO messages (from_id,to_id,message_text) VALUES (?,?,?);';
                connection.query(query,[userId,friendId,message],(err,result) => {
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
        catch(err)
        {
            return err;
        }
    }

    loadFriendRequests = async (userId) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'SELECT users.user_id,users.username,users.image FROM users INNER JOIN requests ON requests.from_id = users.user_id WHERE requests.to_id = ?;';
                connection.query(query,[userId],(err,results) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        resolve({flg:1,requests:results});
                    }
                });
            });
            return promise;
        }
        catch(err)
        {
            return err;
        }
    }

    acceptFriendRequest = (userId,friendId) => {
        try
        {
            let promise = new Promise((resolve,reject) => {
                let query = 'INSERT INTO friends VALUES (?,?)';
                connection.query(query,[userId,friendId],(err,result) => {
                    if(result.affectedRows > 0)
                    {
                        resolve({flg:1})
                    }
                    else
                    {
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

    deleteFriendRequest = async (fromId,toId) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'DELETE FROM requests WHERE from_id = ? AND to_id = ?';
                connection.query(query,[fromId,toId],(err,result) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        if(result.affectedRows > 0)
                            resolve({flg:1});
                        else
                            resolve({flg:0});
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
}

module.exports =  Database;