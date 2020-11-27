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
                let query = 'INSERT INTO notifications VALUES(0,?,?,?,?)';
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
}

module.exports = Notification;