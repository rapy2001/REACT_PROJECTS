const express = require('express');
const dotenv = require('dotenv');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');
const upload = require('express-fileupload');
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));
let User = require('./classes/User');
let Request = require('./classes/Request');
let Friend = require('./classes/Friend');
let Post = require('./classes/Post');
let Notification = require('./classes/Notification');
let Like = require('./classes/Like');
let Comment = require('./classes/Comment');
//register route 
app.use(upload());
let obj = null;
app.post('/register',(req,res) => {
    // console.log(req.body);
   bcrypt.hash(req.body.password,10,async (err,hash) => {
       if(err)
       {
           res.json({flg:0});
       }
       else
       {
           obj = User.createObj();
           let promise = await obj.insertUser(req.body.username,hash,req.body.image,req.body.description);
           if(promise.flg === 2)
           {
               res.json({flg:2});
           }
           else if(promise.flg === 1)
           {
               res.json({flg:1});
           }
           else
           {
               res.json({flg:0});
           }
       }
   })
});

app.post('/login',(req,res) => {
    let obj = User.createObj();
    let login = async () => {
        let promise = await obj.getUserByUsername(req.body.username);
        if(promise.flg === 1)
        {
            let user = promise.user;
            // console.log(user);
            if(bcrypt.compareSync(req.body.password,user.password))
            {
                res.json({flg:1,user:user});
            }
            else
            {
                res.json({flg:3});
            }
        }
        else
        {
            res.json({flg:2});
        }
    }
    login();
})

app.get('/getUsers/:userId',(req,res) => {
    let obj = User.createObj();
    let getUsers = async () => {
        let promise = await obj.getUsers(req.params.userId);
        if(promise.flg === 1)
        {
            res.json({flg:1,users:promise.users});
        }
        else
        {
            res.json({flg:0});
        }
    }
    getUsers();
})

app.post('/sendFriendRequest',(req,res) => {
    let obj = Request.createObj();
    let sendFriendRequest = async () => {
        let promise = await obj.insertRequest(req.body.userId,req.body.friendId);
        if(promise.flg === 1)
        {
            res.json({flg:1});
        }
        else
        {
            res.json({flg:0});
        }
    } 
    sendFriendRequest();
})

app.get('/getFriendRequests/:userId', (req,res) => {
    let obj = Request.createObj();
    let getFriendRequests = async () => {
        let promise = await obj.getUserRequests(req.params.userId);
        if(promise.flg === 1)
        {
            res.json({flg:1,requests:promise.requests});
        }
        else
        {
            res.json({flg:0});
        }
    }
    getFriendRequests();
});

app.post('/acceptFriendRequest',(req,res) => {
    let obj = Friend.createObj();
    let acceptFriendRequest = async () => {
        let promise = await obj.acceptFriendRequest(req.body.userId,req.body.friendId);
        console.log(promise);
        if(promise.flg === 1)
        {
            let requestObj = Request.createObj();
            let newPromise = await requestObj.rejectFriendRequest(req.body.userId,req.body.friendId);
            if(newPromise.flg === 1)
            {
                res.json({flg:1});
            }
            else
            {
                res.json({flg:0});
            }
        }
        else
        {
            res.json({flg:0});
        }
    }
    acceptFriendRequest();
})

app.post('/rejectFriendRequest',(req,res) => {
    let obj = Request.createObj();
    let rejectFriendRequest = async () => {
        let promise = await obj.rejectFriendRequest(req.body.userId,req.body.friendId);
        if(promise.flg === 1)
        {
            res.json({flg:1});
        }
        else
        {
            res.json({flg:0});
        }
    }
    rejectFriendRequest();
})

app.post('/addPost',(req,res) => {
   
    let postObj = Post.createObj();
    let notifObj = Notification.createObj();
    let friendObj = Friend.createObj();
    let promise1 = null;
    let promise2 = null;
    let promise3 = null;
    let addPost = async () => {
        // console.log(req.body);
        promise1 = await postObj.insertPost(req.body.userId,req.body.title,req.body.description,req.body.image);
        if(promise1.flg === 1)
        {
            promise2 = await friendObj.getUserFriends(req.body.userId);
            if(promise2.flg === 1)
            {
                for(let i = 0; i<promise2.friends.length; i++)
                {
                    promise3 = await notifObj.insertNotification(promise2.friends[i].user_id,promise1.postId,1);
                    if(promise3.flg === 1)
                    {
                        res.json({flg:1});
                    }
                    else
                    {
                        console.log('world');
                        res.json({flg:0});
                    }
                }
            }
            else
            {
                console.log(promise2);
                res.json({flg:0});
            }
        }
        else
        {
            res.json({flg:0});
        }
        
    }
    addPost();
});


app.get('/getFeed/:userId',(req,res) => {
    let postObj = Post.createObj();
    let getFeed = async () => {
        let promise = await postObj.getUserPosts(req.params.userId);
        if(promise.flg === 1)
        {
            let likeObj = Like.createObj();
            // console.log(promise);
            for(let i = 0; i<promise.posts.length; i++)
            {
                let newPromise = await likeObj.getPostLikes(promise.posts[i].post_id);
                promise.posts[i].likes = newPromise.likes;
                newPromise = await likeObj.checkLikeStatus(req.params.userId,promise.posts[i].post_id);
                if(newPromise.flg === 1)
                {
                    promise.posts[i]['likeStatus'] = 1;
                }
                else
                {
                    promise.posts[i]['likeStatus'] = 0;
                }
            }               
            res.json({flg:1,posts:promise.posts});
        }
        else
        {
            res.json({flg:0});
        }
    }
    getFeed();
});

app.post('/likePost',(req,res) => {
    // console.log(req.body);
    let obj = Like.createObj();
    let likePost = async () => {
        let promise = await obj.likePost(req.body.userId,req.body.postId);
        if(promise.flg === 1)
        {
            res.json({flg:1});
        }
        else
        {
            res.json({flg:0});
        }
    }
    likePost();
});

app.post('/unLikePost',(req,res) => {
    let obj = Like.createObj();
    let unLikePost = async () => {
        let promise = await obj.unLikePost(req.body.userId,req.body.postId);
        if(promise.flg === 1)
        {
            res.json({flg:1});
        }
        else
        {
            res.json({flg:0});
        }
    }
    unLikePost();
});

app.get('/getPost/:postId',(req,res) =>{
    let postObj = Post.createObj();
    let getPost = async () => {
        let promise = await postObj.getPost(req.params.postId);
        if(promise.flg === 1)
        {
            res.json({flg:1,post:promise.post});
        }
        else
        {
            res.json({flg:0});
        }
    }
    getPost();
})

app.post('/addComment',(req,res) => {
    let commentObj = Comment.createObj();
    const addComment = async () => {
        let promise = await commentObj.addComment(req.body.userId,req.body.postId,req.body.commentText);
        if(promise.flg === 1)
        {
            let notifObj = Notification.createObj();
            let response = await notifObj.insertNotification(req.body.userId,req.body.postId,2)
            if(response.flg === 1)
            {
                res.json({flg:1});
            }
            else
            {
                res.json({flg:0});
            }
        }
        else
        {
            res.json({flg:0});
        }
    }
    addComment()
})

app.get('/getComments/:postId',(req,res) => {
    let commentObj = Comment.createObj();
    let getComments = async () => {
        let promise = await commentObj.getComments(req.params.postId);
        if(promise.flg === 1)
        {
            res.json({flg:1,comments:promise.comments});
        }
        else
        {
            res.json({flg:0});
        }
    }
    getComments();
})

app.get('/getNotifications/:userId',(req,res) => {
    let notifObj = Notification.createObj();
    let getNotifications = async () => {
        let promise = await notifObj.getNotifications(req.params.userId);
        // console.log(promise.data[0].user_id);
        if(promise.flg === 1)
        {
            let data = promise.data;
            for(let i = 0; i<data.length; i++)
            {
                let obj = null;
                let response1 = null;
                let response2 = null;
                let userObj = User.createObj();
                if(data[i].type === 1)
                {
                    obj = Post.createObj();
                    response1 = await obj.getPost(data[i]['data']);
                    // console.log(response1);
                    if(response1.flg === 1)
                    {
                        response2 = await userObj.getUser(response1.post.user_id);
                        if(response2.flg === 1)
                        {
                            data[i]['username'] = response2.user.username;
                            data[i]['user_id'] = response2.user.user_id;
                        }
                        else
                        {
                            res.json({flg:0});
                            break;
                        }
                    }
                    else
                    {
                        console.log('error 1');
                        res.json({flg:0});
                        break;
                    }
                }
                else if(data[i].type === 2)
                {
                    obj = Like.createObj();
                    response1 = await obj.getLike(data[i]['data']);
                    // console.log(response1);
                    if(response1.flg === 1)
                    {
                        response2 = await userObj.getUser(response1.like.user_id);
                        if(response2.flg === 1)
                        {
                            data[i]['username'] = response2.user.username;
                            data[i]['user_id'] = response2.user.user_id;
                        }
                        else
                        {
                            res.json({flg:0});
                            break;
                        }
                    }
                    else
                    {
                        console.log('error 2');
                        res.json({flg:0});
                        break;
                    }
                }
                else if(data[i].type === 3)
                {
                    obj = Comment.createObj();
                    response1 = await obj.getComment(data[i]['data']);
                    // console.log(response1);
                    if(response1.flg === 1)
                    {
                        response2 = await userObj.getUser(response1.comment.user_id);
                        if(response2.flg === 1)
                        {
                            data[i]['username'] = response2.user.username;
                            data[i]['user_id'] = response2.user.user_id;
                        }
                        else
                        {
                            res.json({flg:0});
                            break;
                        }
                    }
                    else
                    {
                        console.log('error 3');
                        res.json({flg:0});
                        break;
                    }
                }
            }
            res.json({flg:1,notifications:data})
        }
        else
        {
            res.json({flg:0});
        }
    }
    getNotifications();
})

app.get('/seed',(req,res) => {
    const seed = async () => {
        let promise = null;
        let obj = null;
        obj = User.createObj();
        promise = await obj.deleteUsers();
        if(promise.flg === 1)
        {
            obj = Request.createObj();
            promise = await obj.deleteRequests();
            if(promise.flg === 1)
            {
                obj = Post.createObj();
                promise = await obj.deletePosts();
                if(promise.flg === 1)
                {
                    obj = Notification.createObj();
                    promise = await obj.deleteNotifications();
                    if(promise.flg === 1)
                    {
                        obj = Like.createObj();
                        promise = await obj.deleteLikes();
                        if(promise.flg === 1)
                        {
                            obj = Friend.createObj();
                            promise = await obj.deleteFriends();
                            if(promise.flg === 1)
                            {
                                obj = Comment.createObj();
                                promise = await obj.deleteComments();
                                if(promise.flg === 1)
                                {
                                    res.json({flg:1});
                                }
                                else
                                {
                                    res.json({flg:0});
                                }
                            }
                            else
                            {
                                res.json({flg:0});
                            }
                        }
                        else
                        {
                            res.json({flg:0});
                        }
                    }
                    else
                    {
                        res.json({flg:0});
                    }
                }
                else
                {
                    res.json({flg:0});
                }
            }
            else
            {
                res.json({flg:0});
            }
        }
        else
        {
            res.json({flg:0});
        }
    }
    seed();
});

app.post('/editImage',(req,res) => {
    // console.log(req.body);
    let imageUpload = async () => {
        let image = req.files.image;
        let name = image.name.split('.');
        name = name[name.length - 1];
        if(name != 'jpg' && name != 'jpeg' && name != 'png' && name != 'gif')
        {
            res.json({flg:-1});
        }
        else if(image.size > 500000)
        {
            res.json({flg:-2});
        }
        else
        {
            let userId = req.body.userId;
            let path = `../components/uploads/${userId + '_' + image.name}`;
            image.mv(path,async (err) => {
                if(err)
                {
                    res.json({flg:-3});
                }
                else
                {
                    let obj = User.createObj();
                    let promise = await  obj.editImage(userId,userId + '_' + image.name);
                    if(promise.flg === 1)
                    {
                        res.json({flg:1});
                    }
                    else
                    {
                        res.json({flg:0});
                    }
                }
            })
        }
    }
    imageUpload();
    
})
app.listen(process.env.PORT,() => {
    console.log(`Server listening at ${process.env.PORT}`);
});