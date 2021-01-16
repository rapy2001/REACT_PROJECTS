const connection = require('../connection/connection');

let obj = null;
class User
{
    static createObj = () => 
    {
        obj = obj == null ? new User() : obj;
        return obj; 
    }

    addUser = async (username,password,image) => {
        try
        {
            let promise = await new Promise((res,rej) => {
                let query = 'INSERT INTO users VALUES(0,?,?,?)';
                connection.query(query,[username,password,image],(err,results) => {
                    if(err)
                    {
                        rej(new Error(`Error while adding the User , Err: ${err.message}`));
                    }
                    else
                    {
                        if(results.affectedRows == 1)
                        {
                            res({flg:1})
                        }
                        else
                        {
                            res({flg:0});
                        }
                    }
                })
            })
            return promise;
        }
        catch(err)
        {
            console.log(err);
            return await new Promise((res,rej) => {
                res({flg:0});
            })
        }
    }

    getUserByUsername = async (username) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'SELECT * FROM users WHERE username = ?';
                connection.query(query,[username],(err,results) => {
                    if(err)
                    {
                        reject(new Error(`Error while getting the user, Err: ${err.message}`));
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
            console.log(err);
            return new Promise((res,rej) => {
                res({flg:0});
            })
        }
    }

    getUserById = async (userId) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'SELECT * FROM users WHERE user_id = ?';
                connection.query(query,[userId],(err,results) => {
                    if(err)
                    {
                        reject(new Error(`Error while getting the user, Err: ${err.message}`));
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
            console.log(err);
            return new Promise((res,rej) => {
                res({flg:0});
            })
        }
    }
}

module.exports = User;