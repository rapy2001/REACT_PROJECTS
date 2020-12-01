// const mysql = require('mysql');
// const connection =mysql.createConnection({
//     user:'root',
//     password:'',
//     database:'social_app',
//     host:'localhost'
// })

// connection.connect((err) => {
//     if(err)
//     {
//         console.log(err.message);
//     }
//     else
//     {
//         console.log(connection.state);
//     }
// })
const connection = require('../connection/connection');
let obj = null;
class Post
{
    static createObj()
    {
        obj = obj === null ? new Post() : obj;
        return obj;
    }

    insertPost = async (userId,title,description,image) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'INSERT INTO posts VALUES (0,?,?,?,?,NOW());';
                connection.query(query,[userId,title,description,image],(err,result) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        if(result.affectedRows > 0)
                        {
                            // console.log(result);
                            resolve({flg:1,postId:result.insertId});
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
            console.log('Error while adding the post' + err.message);
            return err;
        }
    }

    getUserPosts = async (userId) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = `
                    SELECT posts.user_id,posts.post_id,posts.title,posts.image,posts.description,posts.created_at,users.username FROM posts INNER JOIN friend ON posts.user_id = friend.friend_id INNER JOIN users ON friend.friend_id = users.user_id WHERE friend.user_id = ? OR posts.user_id = ?;
                `;
                connection.query(query,[userId,userId],async (err,results) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        if(results.length > 0)
                        {
                            // console.log(results);
                            resolve({flg:1,posts:results});
                        }
                        else
                        {
                            resolve({flg:0});
                        }
                    }
                });
            })
            return promise;
        }
        catch(err)
        {
            console.log('error while getting the Post ' + err.message);
            return err;
        }
    }

    getPost = async (postId) => {
        try
        {
            let promise = new Promise((resolve,reject) => {
                let query = 'SELECT * FROM posts WHERE post_id = ?';
                connection.query(query,[postId],(err,result) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        resolve({flg:1,post:result[0]});
                    }
                })
            })
            return promise;
        }
        catch(err)
        {
            console.log('error while getting the Posts ' + err.message);
            return err;
        }
    }
    deletePosts = async () => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'DELETE FROM posts';
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
            console.log('error while deleting the posts ' + err.message);
            return err;
        }
    }
}


module.exports = Post;