const express = require('express');
const cors = require('cors');
const env = require('dotenv');
const app = express();
const Book = require('./classes/Book');
env.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.post('/addBook',(req,res) => {
    if(req.body.name == '' || req.body.isbn == '' || req.body.publisher == '' || req.body.edition == '' || req.body.price == '' || req.body.pages == '')
    {
        res.status(400).json({flg:-1});
    }
    else
    {
        let bookObj = Book.createObj();
        const addBook = async () => {
            let promise = await bookObj.insertBook(req.body.name,req.body.isbn,req.body.publisher,req.body.edition,req.body.price,req.body.pages);
            if(promise.flg === 1)
            {
                res.json({flg:1});
            }
            else
            {
                res.status(500).json({flg:0});
            }
        }
        addBook();
    }
})
app.listen(process.env.PORT,() => {
    console.log(`Server listeining at port ${process.env.PORT}`);
})