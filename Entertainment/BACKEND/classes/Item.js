const connection = require('../connection/connection');

let obj = null;
class Item
{
    static createObj = () =>
    {
        return obj = obj == null ? new Item() : obj;
    }

    addItem = async (name,image,genre,description,type) => {
        // console.log('hello from add Item')
        if(type == 1)
        {
            try
            {
                let promise = await new Promise((resolve,reject) => {
                    let query = 'INSERT INTO shows VALUES(0,?,?,?,?)';
                    connection.query(query,[name,image,genre,description],(err,results) => {
                        if(err)
                        {
                            reject(new Error(`Error while adding the TV Show . Err: ${err}`));
                        }
                        else
                        {
                            // console.log('hello in item');
                            if(results.affectedRows > 0)
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
                console.log(err);
                let promise = await new Promise((resolve,reject) => {
                    resolve({flg:0});
                })
                return promise;
            }
        }
        else if(type == 2)
        {
            try
            {
                let promise = await new Promise((resolve,reject) => {
                    let query = 'INSERT INTO movies VALUES(0,?,?,?,?)';
                    connection.query(query,[name,image,genre,description,type],(err,results) => {
                        if(err)
                        {
                            reject(new Error(`Error while adding the Movie . Err: ${err}`));
                        }
                        else
                        {
                            // console.log('hello in movies')
                            if(results.affectedRows > 0)
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
                console.log(err);
                let promise = await new Promise((resolve,reject) => {
                    resolve({flg:0});
                })
                return promise;
            }
        }
        
    }   
    
    getItemsByGenre = async (type,genre) => {
        if(type == 1)
        {
            try
            {
                let promise = await new Promise((resolve,reject) => {
                    let query = 'SELECT * FROM shows WHERE genre_id = ?';
                    connection.query(query,[genre],(err,results) => {
                        if(err)
                        {
                            reject(new Error(`Error while getting the Shows. Err: ${err}`));
                        }
                        else
                        {
                            resolve({flg:1,data:results})
                        }
                    })
                })
                return promise;
            }
            catch(err)
            {
                console.log(err);
                return await new Promise((resolve,reject) => {
                    resolve({flg:0});
                })
            }
        }
        else if(type === 2)
        {
            try
            {
                let promise = await new Promise((resolve,reject) => {
                    let query = 'SELECT * FROM movies WHERE genre_id = ?';
                    connection.query(query,[genre],(err,results) => {
                        if(err)
                        {
                            reject(new Error(`Error while getting the Movies. Err: ${err}`));
                        }
                        else
                        {
                            resolve({flg:1,data:results})
                        }
                    })
                })
                return promise;
            }
            catch(err)
            {
                console.log(err);
                return await new Promise((resolve,reject) => {
                    resolve({flg:0});
                })
            }
        }
    }

    getItemsById = async (id,type) => {
        if(type === 1)
        {
            try
            {
                let promise = await new Promise((resolve,reject) => {
                    let query = 'SELECT * FROM movies WHERE movie_id = ?';
                    connection.query(query,[id],(err,results) => {
                        if(err)
                        {
                            reject(new Error(`Error while getting the movie. Err: ${err}`));
                        }
                        else
                        {
                            resolve(
                                {
                                    flg:1,
                                    data:results
                                }
                            )
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
        else if(type === 2)
        {
            try
            {
                let promise = await new Promise((resolve,reject) => {
                    let query = 'SELECT * FROM shows WHERE show_id = ?';
                    connection.query(query,[id],(err,results) => {
                        if(err)
                        {
                            reject(new Error(`Error while getting the show. Err: ${err}`));
                        }
                        else
                        {
                            resolve(
                                {
                                    flg:1,
                                    data:results
                                }
                            )
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
}

module.exports = Item;