const express = require('express');
const cors = require('cors');
const app = express();
const env = require('dotenv');
const Database = require('./database');
env.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
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
    
})
app.listen(process.env.PORT,() => {
    console.log(`Server listening at ${process.env.PORT}`);
})