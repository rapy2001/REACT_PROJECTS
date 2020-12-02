const connection = require("../connection/connection");

let obj = null;

class Book
{
    static createObj()
    {
        obj = obj === null ? new Book() : obj;
        return obj;
    }

    insertBook = async (name,isbn,publisher,edition,price,pages) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'INSERT INTO books VALUES (0,?,?,?,?,?,?)';
                connection.query(query,[name,isbn,publisher,edition,price,pages],(err,result) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        if(result.affectedRows > 0)
                        {
                            resolve({flg:1});
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
            console.log('error while inserting the book' + err.message);
            return err;
        }
    }
}

module.exports = Book;