const express = require('express');
const cors = require('cors');
const app = express();
const env = require('dotenv');
const Database = require('./database');
env.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
let obj = Database.createObj();
const bcrypt = require('bcrypt');

app.post('/register',(req,res) => {
    bcrypt.hash(req.body.password,10,async (err,hash) => {
        if(err)
        {
            res.status(500).json({flg : -2})
        }
        else
        {
            let result = await obj.register(req.body.username,hash,req.body.image);
            res.json(result);
        }
    })
    
})

app.post('/login',async (req,res) => {
    // console.log(req.body.username);
    // console.log(req.body);
    let promise = await obj.getUserByUsername(req.body.username);
    if(promise.flg === 1)
    {
        if(bcrypt.compareSync(req.body.password,promise.user.password))
        {
            let response = await obj.logIn(promise.user.user_id);
            if(response.flg === 1)
            {
                res.json({flg:1,user:promise.user});
            }
            else
            {
                res.json({flg:0});
            }
        }
        else
        {
            res.json({flg:3});
        }
    }
    else
    {
        res.status(200).json({flg:2});
    }
    
});

app.get('/getUsers/:id',(req,res) => {
    let obj = Database.createObj();
    const getUsers = async () => {
        let promise = await obj.getUsers(req.params.id);
        res.status(200).json({flg:1,users:promise});
    }
    getUsers();
});

app.post('/sendFriendRequest',(req,res) => {
    let obj = Database.createObj();
    // console.log(req.body);
    let request = async () => {
        let promise = await obj.sendFriendRequest(req.body.userId,req.body.friendId);
        if(promise.flg === 1)
        {
            res.json({flg:1});
        }
        else
        {
            res.json({flg:0});            
        }
    }
    request();
});

app.get('/getFriends/:id',(req,res) => {
    let obj = Database.createObj();

    let getFriends = async () => {
        let promise = await obj.getFriends(req.params.id);
        if(promise.flg === 1)
        {
            res.json({flg:1,users:promise.users});
        }
        else
        {
            res.json({flg:0})
        }
    }
    getFriends();
});

app.get('/getMessages/:userId/:friendId',(req,res) => {
    let obj = Database.createObj();
    let getMessages = async () => {
        let promise  =await obj.getMessages(req.params.userId,req.params.friendId);
        if(promise.flg === 1)
        {
            res.json({flg:1,messages:promise.messages});
        }
        else
        {
            res.json({flg:0});
        }
    }
    getMessages();
});

app.post('/addMessage',(req,res) => {
    let obj = Database.createObj();
    let addMessage = async () => {
        let promise = await obj.addMessage(req.body.userId,req.body.friendId,req.body.message);
        if(promise.flg === 1)
        {
            res.json({flg:1});
        }
        else
        {
            res.json({flg:0});
        }
    }
    addMessage();
});

app.get('/getFriendRequests/:userId',(req,res) => {
    let obj = Database.createObj();
    let loadFriendRequests = async () => {
        let promise = await obj.loadFriendRequests(req.params.userId);
        if(promise.flg === 1)
        {
            res.json({flg:1,requests:promise.requests});
        }
        else
        {
            res.json({flg:0});
        }
    }
    loadFriendRequests();
});

app.post('/acceptFriendRequest',(req,res) => {
    let obj = Database.createObj();
    let acceptFriendRequest = async () => {
        let promise = await obj.acceptFriendRequest(req.body.userId,req.body.friendId);
        if(promise.flg === 1)
        {
            let newPromise =  await obj.acceptFriendRequest(req.body.friendId,req.body.userId);
            if(newPromise.flg === 1)
            {
                let newResponse = await obj.deleteFriendRequest(req.body.friendId,req.body.userId);
                if(newResponse.flg === 1)
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
    acceptFriendRequest();
});

app.post('/deleteFriendRequest',(req,res) => {
    // console.log(req.body);
    let obj = Database.createObj();
    let deleteFriendRequest = async () => {
        let promise = await obj.deleteFriendRequest(req.body.friendId,req.body.userId);
        if(promise.flg === 1)
        {
            res.json({flg:1});
        }
        else
        {
            res.json({flg:0});
        }
    }
    deleteFriendRequest();
});


app.listen(process.env.PORT,() => {
    console.log(`Server listening at ${process.env.PORT}`);
});