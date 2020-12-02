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
    checkLikeStatus = async (userId,postId) => {
        try
        {
            let promise = new Promise((resolve,reject) => {
                let query = 'SELECT * FROM likes WHERE user_id = ? AND post_id = ?';
                connection.query(query,[userId,postId],(err,results) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        if(results.length > 0)
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
            console.log('Error while checkign the like status ' + err.message);
            return err;
        }
    }

    likePost = async (userId,postId) => {
        try
        {
            let promise = new Promise((resolve,reject) => {
                let query = 'INSERT INTO likes VALUES (0,?,?)';
                connection.query(query,[userId,postId],(err,result) => {
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
            console.log('error while liking the post ' + err.message);
            return err;
        }
    }

    unLikePost = async (userId,postId) => {
        try
        {
            let promise = new Promise((resolve,reject) => {
                let query = 'DELETE FROM likes WHERE user_id = ? AND post_id = ?';
                connection.query(query,[userId,postId],(err,result) => {
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
            console.log('error while liking the post ' + err.message);
            return err;
        }
    }

    getLike = async (likeId) => {
        try
        {
            let promise = new Promise((resolve,reject) => {
                let query = 'SELECT * FROM likes WHERE like_id = ?';
                connection.query(query,[likeId],(err,results) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        if(results.length >  0)
                        {
                            resolve({flg:1,like:results[0]});
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
            console.log('error while getting the like  ' + err.message);
            return err;
        }
    }
    deleteLikes = async () => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'DELETE FROM likes';
                connection.query(query,(err,result) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        if(result.affectedRows >= 0)
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
            console.log('error while deleting the likes ' + err.message);
            return err;
        }
    }
}

module.exports = Like;