const express = require('express');
const env = require('dotenv');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
env.config();
const User = require('./classes/User');
const Account = require('./classes/Account');
const Genre = require('./classes/Genre');
const Item = require('./classes/Item');
const Episode = require('./classes/Episode');



app.post('/addUser',(req,res) => {
    // console.log(req.body)
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
                                    res.json({flg:0});
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

app.post('/login',(req,res) => {
    // console.log(req.body);
    if(req.body.username == undefined || req.body.password == undefined)
    {
        res.status(400).json({flg:-1});
    }
    else
    {
        const login = async () => {
            let obj = User.createObj();
            let promise = await obj.getUserByUsername(req.body.username);
            if(promise.flg == 1)
            {
                if(promise.users.length > 0)
                {
                    if(bcrypt.compareSync(req.body.password,promise.users[0].password))
                    {
                        let user = {username:promise.users[0].username,userId:promise.users[0].user_id}
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
            else
            {
                res.status(500).json({flg:0});
            }
        }
        login();
    }
})

app.post('/addAccount',(req,res) => {
    if(req.body.userId == undefined || req.body.name == undefined)
    {
        res.status(400).json({flg:-1});
    }
    else
    {
        // console.log(req.body);
        const addAccount = async () => {
            let user = User.createObj();
            let promise = await user.getUserById(req.body.userId);
            if(promise.flg == 1)
            {
                if(promise.users.length == 1)
                {
                    let obj = Account.createObj();
                    let promsie1 = await obj.getAccounts(req.body.userId);
                    if(promsie1.flg === 1)
                    {
                        if(promsie1.accounts.length < 4)
                        {
                            let promsie2 = await obj.getByName(req.body.name,req.body.userId);
                            if(promsie2.flg == 1)
                            {
                                if(promsie2.accounts.length == 0)
                                {
                                    let promsie3 = await obj.addAccount(req.body.userId,req.body.name);
                                    if(promsie3.flg == 1)
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
                                    res.json({flg:3});
                                }
                            }
                            else
                            {
                                res.status(500).json({flg:-4});
                            }
                        }
                        else
                        {
                            res.json({flg:2});
                        }
                    }
                    else
                    {
                        res.status(500).json({flg:-3});
                    }
                }
                else
                {
                    res.json({flg:4});
                }
            }
            else
            {
                res.status(500).json({flg:-2});
            }
        }
        addAccount();
    }
})

app.get('/getAccounts/:userId',(req,res) => {
    // console.log(req.params);
    if(req.params.userId == undefined)
    {
        res.status(400).json({flg:-1});
    }
    else
    {
        const getAccounts = async () => {
            let obj = Account.createObj();
            let promise = await obj.getAccounts(req.body.userId);
            if(promise.flg == 1)
            {
                res.json({flg:1,accounts:promise.accounts});
            }
            else
            {
                res.json({flg:0});
            }
        }
        getAccounts();
    }
})

app.get('/getGenres',(req,res) => {
    const getGenres = async () => {
        let obj = Genre.createObj();
        let promise = await obj.getGenres();
        if(promise.flg === 1)
        {
            res.json({flg:1,genres:promise.genres});
        }
        else
        {
            res.status(500).json({flg:0});
        }
    }
    getGenres();
})

app.post('/addItem',(req,res) => {
    // console.log(req.body);
    if(req.body.name === undefined || req.body.image === undefined || req.body.genre === undefined || req.body.description === undefined || req.body.type === undefined)
    {
        res.status(400).json({flg:0});
    }
    else
    {
        const addItem = async () => {
            let obj = new Item();
            let promise = await obj.addItem(req.body.name,req.body.image,req.body.genre,req.body.description,req.body.type);
            console.log(promise);
            if(promise.flg === 1)
            {
                res.json({flg:1});
            }
            else
            {
                res.status(500).json({flg:0});
            }
        }
        addItem();
    }
    
})

app.get('/getItems/:type',(req,res) => {
    // console.log('hello');
    if(req.params.type === undefined)
    {
        res.status(400).json({flg:-1});
    }
    else
    {
        const getMovies = async () => {
        
            let genreObj = Genre.createObj();
            let promise_1 = await genreObj.getGenres();
            // console.log(promise_1);
            if(promise_1.flg === 0)
            {
                res.status(500).json({flg:0});
            }
            else
            {
                
                if(promise_1.genres.length > 0)
                {
                    let itemObj = Item.createObj();
                    let genres = promise_1.genres;
                    let data = [];
                    for(let i = 0; i<genres.length; i++)
                    {
                        let promise_2 = await itemObj.getItemsByGenre(parseInt(req.params.type),genres[i].genre_id);
                        if(promise_2.flg === 1)
                        {
                            data.push({
                                genre:genres[i],
                                items:promise_2.data
                            })
                        }
                        else
                        {
                            res.status(500).json({flg:0});
                            break;
                        }
                        if(i === genres.length - 1)
                        {
                            res.json({flg:1,data:data});
                        }
                    }
                }
                else
                {
                    res.json({flg:1,data:[]});
                }
            }
        }
        getMovies();
    }
    
})

app.post('/addEpisode',(req,res) => {
    // console.log(req.body);
    if(req.body.name == undefined || req.body.description == undefined || req.body.showId == undefined)
    {
        res.status(400).json({flg:-1});
    }
    else
    {
        const addEpisode = async () => {
            let obj = Episode.createObj();
            let image = req.body.image;
            if(req.body.image == '')
            {
                image = 'https://cdn.dribbble.com/users/2402741/screenshots/5258702/popcorn-01.jpg?compress=1&resize=800x600';
            }
            let promise = await obj.addEpisode(req.body.name,req.body.description,image,req.body.showId)
            if(promise.flg == 1)
            {
                res.json({flg:1});
            }
            else
            {
                res.status(500).json({flg:0});
            }
        }
        addEpisode();
    }
})

app.get('/getShow/:id',(req,res) => {
    if(req.params.id === undefined)
    {
        res.status(400).json({flg:-1});
    }
    else
    {
        const getShow = async () => {
            let obj = Item.createObj();
            let promise = await obj.getItemsById(req.params.id,2);
            if(promise.flg === 1)
            {
                let newObj = Episode.createObj();
                let newPromise = await newObj.getShowEpisodes(req.params.id);
                if(newPromise.flg === 1)
                {
                    res.send({
                        flg:1,
                        data:{show:promise.data[0],episodes:newPromise.data}
                    })
                }
                else
                {
                    res.send({
                        flg:0
                    })
                }
            }
            else
            {
                res.send({
                    flg:0
                })
            }
        }
        getShow();
    }
})

app.get('/getMovie/:id',(req,res) => {
    if(req.params.id === undefined)
    {
        res.status(400).json({flg:-1});
    }
    else
    {
        const getShow = async () => {
            let obj = Item.createObj();
            let promise = await obj.getItemsById(req.params.id,1);
            if(promise.flg === 1)
            {
                res.send({
                    flg:1,
                    data:promise.data[0]
                })
            }
            else
            {
                res.send({
                    flg:0
                })
            }
        }
        getShow();
    }
})
app.listen(process.env.PORT,() => {
    console.log(`Server listening at PORT ${process.env.PORT}`);
})