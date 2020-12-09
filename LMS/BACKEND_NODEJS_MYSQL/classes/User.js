const connection = require('../connection/connection');

let obj = null;

class User
{
    static createObj()
    {
        obj = obj === null ? new User() : obj;
        return obj;
    }

    getUser = async (username,type) =>
    {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'SELECT * FROM users WHERE username = ? AND type = ?';
                connection.query(query,[username,type],(err,results) => {
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
            })
            return promise;
        }
        catch(err)
        {
            console.log('error while getting the user ' + err.message);
            return err;
        }
    }
}

module.exports = User;