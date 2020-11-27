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
}


module.exports = Post;