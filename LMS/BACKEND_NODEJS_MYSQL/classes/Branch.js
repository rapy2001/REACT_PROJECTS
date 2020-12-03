const connection = require('../connection/connection');

let obj = null;

class Branch
{
    static createObj()
    {
        obj = obj === null ? new Branch() : obj;
        return obj;
    }

    insertBranch = async (courseId,branchName) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'INSERT INTO branches VALUES (0,?,?)';
                connection.query(query,[branchName,courseId],(err,result) => {
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
            console.log('error while inserting the branch ' + err.message);
            return err;
        }
    }

    updateBranch = async (branchId,courseId,branchName) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'UPDATE branches SET branch_name = ? , course_id = ? WHERE branch_id = ?';
                connection.query(query,[branchName,courseId,branchId],(err,result) => {
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
            console.log('error while updating the branch ' + err.message);
            return err;
        }
    }

    getBranches = async (courseId) => {
        try
        {
            let promise = new Promise((resolve,reject) => {
                let query = 'SELECT * FROM branches WHERE course_id = ?';
                connection.query(query,[courseId],(err,results) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        resolve({flg:1,branches:results});
                    }
                })
            });
            return promise;
        }
        catch(err)
        {
            console.log('error while getting the branches + ' + err.message);
            return err;
        }
    }
}

module.exports = Branch;