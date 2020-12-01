// const mysql = require('mysql');
// const connection = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'social_app'
// });

// connection.connect((err) => {
//     if(err)
//     {
//         console.log(err.message);
//     }
//     else
//     {
//         console.log(connection.state);
//     }
// })
const connection = require('../connection/connection');
let obj = null;

class Request
{
    static createObj()
    {
        obj = obj === null ? new Request() : obj;
        return obj;
    }

    insertRequest = async (fromId,toId) => {
        try
        {
            let promise = new Promise((resolve,reject) => {
                let query = 'INSERT INTO requests (from_id,to_id) VALUES(?,?)';
                connection.query(query,[fromId,toId],(err,result) => {
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
            console.log('error while inserting the request' + err.message);
            return err;
        }
    }

    getUserRequests = async (userId) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'SELECT users.username,users.user_id, users.image FROM users INNER JOIN requests ON users.user_id = requests.from_id WHERE requests.to_id = ? ';
                connection.query(query,[userId],(err,results) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        resolve({flg:1,requests:results});
                    }
                })
            })
            return promise;
            
        }
        catch(err)
        {
            console.log('Error While getting the Friend Requests' + err.msg);
        }
    }

    rejectFriendRequest = async (toId,fromId) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'DELETE FROM requests WHERE to_id = ? AND from_id = ?';
                connection.query(query,[toId,fromId],(err,result) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        // console.log(result);
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
            console.log('error while deleting the Friend Request' + err.message);
            return err;
        }
    }
    deleteRequests = async () => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'DELETE FROM requests';
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
            console.log('error while deleting the requests ' + err.message);
            return err;
        }
    }
}

module.exports = Request;