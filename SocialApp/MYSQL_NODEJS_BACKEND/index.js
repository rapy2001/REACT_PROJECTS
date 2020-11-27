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
app.listen(process.env.PORT,() => {
    console.log(`Server listening at ${process.env.PORT}`);
});