const connection = require('../connection/connection');

let obj = null;

class Like
{
    static createObj()
    {
        obj = obj === null ? new Like() : obj;
        return obj;
    }
    getPostLikes = async (postId) =>
    {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'SELECT * FROM likes WHERE post_id = ?';
                connection.query(query,[postId],(err,results) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        resolve({flg:1,likes:results});
                    }
                })
            })
            return promise;
        }
        catch(err)
        {
            console.log('Error while getting the posts likes ' + err.message);
            return err;
        }   
    }
}

module.exports = Like;