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

    updateBook = async (bookId,name,isbn,publisher,edition,prices,pages) => {
        try
        {
            let response = await new Promise((resolve,reject) => {
                let query = 'UPDATE books SET name = ? , isbn = ? , publisher = ? , edition = ? , price = ? , pages = ? WHERE book_id = ?';
                connection.query(query,[name,isbn,publisher,edition,prices,pages,bookId],(err,result) => {
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
            return response;
        }
        catch(err)
        {
            console.log('error while updating book ' + err.message);
            return err;
        }
    }

    deleteBook = async (bookId) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'DELETE FROM books WHERE book_id = ?';
                connection.query(query,[bookId],(err,result) => {
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
            console.log('error while deleting the book ' + err.message);
            return err;
        }
    }

    searchBook = async (bookName) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let ary = bookName.split(' ');
                let query = 'SELECT * FROM books WHERE name LIKE ';
                for(let i = 0; i<ary.length; i++ )
                {
                    if(i == ary.length- 1)
                        query += `'${ary[i]}'`;
                    else
                        query += `'${ary[i]}' OR `;
                }
                connection.query(query,(err,results) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        resolve({flg:1,books:results});
                    }
                })
            })
            return promise;
        }
        catch(err)
        {
            console.log('error while searching the Book ' + err.message);
            return err;
        }
    }
}

module.exports = Book;