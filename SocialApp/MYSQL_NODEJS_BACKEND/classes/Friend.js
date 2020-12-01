// const mysql = require('mysql');
// const connection = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'social_app'
// })

// connection.connect((err) => {
//     if(err)
//     {
//         console.log(err.message);
//     }
//     else
//     {
//         console.log(connection.state);
//     }
// });
const connection = require('../connection/connection');
let obj = null;
class Friend
{
    static createObj()
    {
        obj = obj === null ? new Friend() : obj;
        return obj;
    }
    acceptFriendRequest = async (userId,friendId) => {
        try
        {
            let promise1 = await new Promise((resolve,reject) => {
                let query = 'INSERT INTO friend (user_id,friend_id) VALUES(?,?);';
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
            })

            let promise2 = await new Promise((resolve,reject) => {
                let query = 'INSERT INTO friend (user_id,friend_id) VALUES(?,?);';
                connection.query(query,[friendId,userId],(err,result) => {
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
            })
            let newPromise = new Promise((resolve,reject) => {
                if(promise1.flg === 1 && promise2.flg === 1)
                {
                   resolve({flg:1});
                }
                else
                {
                    resolve({flg:0});
                }
            })
           return newPromise;
        }
        catch(err)
        {
            console.log('error while accepting the Friend Request ' + err.message);
            return err;
        }
    }

    getUserFriends = async (userId) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'SELECT users.username,users.image,users.user_id FROM users INNER JOIN friend ON users.user_id = friend.friend_id WHERE friend.user_id = ?;';
                connection.query(query,[userId],(err,results) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        if(results.length > 0)
                        {
                            resolve({flg:1,friends:results});
                        }
                        else
                        {
                            resolve({flg:1,friends:[]});
                        }
                    }
                })
            });
            return promise;
        }
        catch(err)
        {
            console.log('error while getting the users friends' + err.message);
            return err;
        }
    }
    deleteFriends = async () => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'DELETE FROM friends';
                connection.query(query,(err,result) => {
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
                })
            })
            return promise;
        }
        catch(err)
        {
            console.log('error while deleting the friends ' + err.message);
            return err;
        }
    }
}

module.exports = Friend;