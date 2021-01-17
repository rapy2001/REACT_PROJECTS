const connection = require('../connection/connection');

let obj = null;

class Genre
{
    static createObj = () => {
        return obj = obj === null ? new Genre() : obj;
    }

    getGenres = async () => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'SELECT * FROM genre';
                connection.query(query,(err,results) => {
                    if(err)
                    {
                        reject(new Error(`Error while getting the genres. Err : ${err}`));
                    }
                    else
                    {
                        resolve({
                            flg:1,
                            genres:results
                        })
                    }
                })
            })
            return promise;
        }
        catch(err)
        {
            console.log(err);
            return await new Promise((resolve,reject) => {
                resolve({
                    flg:0
                })
            })
        }
    }
}

module.exports = Genre;