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
//         console.log(err);
//     }
//     else
//     {
//         console.log('Notification connection established')
//     }
// })

const connection = require('../connection/connection');
let obj = null;
class Notification
{
    static createObj()
    {
        obj = obj === null ? new Notification() : obj;
        return obj;
    }
    insertNotification = async (userId,data,type) => {
        try
        {
            let promise = new Promise((resolve,reject) => {
                let query = 'INSERT INTO notifications VALUES(0,?,?,?,?,NOW())';
                connection.query(query,[userId,type,data,0],(err,result) => {
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
            console.log('Error while inserting the notification ' + err.mesage);
            return err;
        }
    }

    getNotifications = async (userId) => {
        try
        {
            let promise = new Promise((resolve,reject) => {
                let query = 'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC';
                connection.query(query,[userId],(err,results) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        resolve({flg:1,data:results})
                    }
                })
            })
            return promise;
        }
        catch(err)
        {
            console.log('error while getting the notifications ' + err.message);
            return err;
        }
    }
    deleteNotifications = async () => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'DELETE FROM  notifications';
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
            console.log('error while deleting the notifications ' + err.message);
            return err;
        }
    }
}

module.exports = Notification;