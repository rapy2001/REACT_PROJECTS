const connection = require('../connection/connection');
let obj = null;
class Comment
{
    static createObj()
    {
        obj = obj === null ? new Comment() : obj;
        return obj;
    }

    addComment = async (userId,postId,commentText) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'INSERT INTO comments VALUES (0,?,?,?)';
                connection.query(query,[commentText,userId,postId],(err,result) => {
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
            console.log('error while adding the comment' + err.message);
            return err;
        }
    }

    getComments = async (postId) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'SELECT * FROM comments WHERE post_id = ?';
                connection.query(query,[postId],(err,results) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        resolve({flg:1,comments:results});
                    }
                })
            })
            return promise;
        }
        catch(err)
        {
            console.log('Error while getting the comments' + err.message);
            return err;
        }
    }
}


module.exports = Comment;