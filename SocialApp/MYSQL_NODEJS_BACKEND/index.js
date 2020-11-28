const express = require('express');
const dotenv = require('dotenv');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
let User = require('./classes/User');
let Request = require('./classes/Request');
let Friend = require('./classes/Friend');
let Post = require('./classes/Post');
let Notification = require('./classes/Notification');
let Like = require('./classes/Like');
//register route 
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
app.listen(process.env.PORT,() => {
    console.log(`Server listening at ${process.env.PORT}`);
});