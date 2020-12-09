const connection = require('../connection/connection');

let obj = null;

class IssuedBooks 
{
    static createObj()
    {
        obj = obj === null ? new IssuedBook() : obj;
        return obj;
    }
    checkBookStatus = async (bookId) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'SELECT * FROM issued_books WHERE book_id = ? AND returned_at <= issued_at';
                connection.query(query,[bookId,studentId],(err,results) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        if(results.length > 0)
                        {
                            resolve({flg:1});
                        }
                        else
                        {
                            resolve({flg:0});
                        }
                    }
                })
            });
            return promise;
        }
        catch(err)
        {
            console.log('error while checking the Book status ' + err.message);
            return err;
        }
    }

    issueBook = async (bookId,studentId) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'INSERT INTO issued_books VALUES (?,?,NOW(),0)';
                connection.query(query,[studentId,bookId],(err,results) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        if(results.affectedRows > 0)
                        {
                            reject({flg:1});
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
            console.log('error while issuing the book ' + err.message);
            return err;
        }
    }
}

module.exports = IssuedBooks;