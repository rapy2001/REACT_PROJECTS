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
//register route 
let obj = null;
app.post('/register',(req,res) => {
    // console.log(req.body);
    const register = async () => {
        bcrypt.hash(req.body.password,10,(err,hash) => {
            if(err)
            {
                res.status(200).json({flg:0});
            }
            else
            {
                let promise;
                const getPromise = async () => {
                    promise = await obj.insertUser(req.body.username,hash,req.body.image,req.body.description);
                    if(promise.flg === 1)
                    {
                        res.json({flg:1});
                    }
                    else
                    {
                        res.json({flg:0});
                    }
                }
                getPromise();
                
            }
        })
    }
    obj = User.createObj();
    let flg = '';
    const getUser = async () => {
        let promise = await obj.getUserByUsername(req.body.username);
        flg = promise.flg;
        if(flg === 1)
        {
            res.json({flg:2});
        }
        else
        {
            register();
        }
    }
    getUser();
    

   
});


app.listen(process.env.PORT,() => {
    console.log(`Server listening at ${process.env.PORT}`);
});