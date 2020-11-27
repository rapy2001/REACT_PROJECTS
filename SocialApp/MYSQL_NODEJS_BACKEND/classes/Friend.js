const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'social_app'
})

connection.connect((err) => {
    if(err)
    {
        console.log(err.message);
    }
    else
    {
        console.log(connection.state);
    }
});
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
}

module.exports = Friend;