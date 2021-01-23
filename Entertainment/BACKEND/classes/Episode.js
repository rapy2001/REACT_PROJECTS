const connection = require('../connection/connection');

let obj = null;

class Episode
{
    static createObj()
    {
        return obj = obj == null ? new Episode() : obj;
    }

    addEpisode = async (name,description,image,id) => {
        try
        {
            const promise = await new Promise((resolve,reject) => {
                let query = 'INSERT INTO episodes VALUES (0,?,?,?,?)';
                connection.query(query,[name,description,image,id],(err,results) => {
                    if(err)
                    {
                        reject(new Error(`Error while adding the Episode. Err : ${err}`));
                    }
                    else
                    {
                        if(results.affectedRows == 1)
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
            return await new Promise((resolve,reject) => {
                resolve({flg:0});
            })
        }   
    }
}

module.exports = Episode;