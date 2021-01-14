const express = require('express');
const env = require('dotenv');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');
app.use(cors());
app.use(express.json());
env.config();
const User = require('./classes/User');

app.post('/addUser',(req,res) => {
    if(req.body.username == undefined || req.body.password == undefined)
    {
        res.status(400).json({
            flg:-1
        })
    }
    else
    {
        let image = '';
        if(req.body.image == undefined)
        {
            image = 'https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        }
        else
            image = req.body.image;
            bcrypt.hash(req.body.password,10,(err,hash) => {
                if(err)
                {
                    res.status(500).json({flg:0});
                }
                else
                {
                    const addUser = async () => {
                        let obj = User.createObj();
                        let newPromise = await obj.getUserByUsername(req.body.username);
                        if(newPromise.flg === 1)
                        {
                            if(newPromise.users.length > 0)
                            {
                                res.json({flg:2});
                            }
                            else
                            {
                                let promise = await obj.addUser(req.body.username,hash,image);
                                if(promise.flg == 1)
                                {
                                    res.json({flg:1});
                                }
                                else
                                {
                                    res.status(500).json({flg:0});
                                }
                            }
                        }
                        else
                        {
                            res.status(500).json({flg:0});
                        }
                    }
                    addUser();
                }
            })
    }
})
app.listen(process.env.PORT,() => {
    console.log(`Server listening at PORT ${process.env.PORT}`);
})