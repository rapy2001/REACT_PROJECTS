const connection = require('../connection/connection');

let obj = null;
class Account
{
    static createObj = () =>
    {
        return obj = obj == null ? new Account() : obj;
    }

    addAccount = async (userId,name) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'INSERT INTO accounts VALUES(0,?,?)';
                connection.query(query,[userId,name],(err,results) => {
                    if(err)
                    {
                        reject(new Error(`Error while adding the Account . Err: ${err}`));
                    }
                    else
                    {
                        if(results.affectedRows > 0)
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
            console.log(err);
            let promise = await new Promise((resolve,reject) => {
                resolve({flg:0});
            })
            return promise;
        }
    }

    getByName = async (name,userId) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'SELECT * FROM accounts WHERE account_name = ? AND user_id = ?';
                connection.query(query,[name,userId],(err,results) => {
                    if(err)
                    {
                        reject(new Error(`Error while getting the user accounts . Err: ${err}`));
                    }
                    else
                    {
                        resolve({flg:1,accounts:results});
                    }
                })
            })
            return promise;
        }
        catch(err)
        {
            console.log(err);
            let promise = await new Promise((resolve,reject) => {
                resolve({flg:0});
            })
            return promise;
        }
    }


    getAccounts = async (userId) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'SELECT * FROM accounts WHERE user_id = ?';
                connection.query(query,[userId],(err,results) => {
                    if(err)
                    {
                        reject(new Error(`Error while getting the user accounts . Err: ${err}`));
                    }
                    else
                    {
                        resolve({flg:1,accounts:results});
                    }
                })
            })
            return promise;
        }
        catch(err)
        {
            console.log(err);
            let promise = await new Promise((resolve,reject) => {
                resolve({flg:0});
            })
            return promise;
        }
    }
}

module.exports = Account;