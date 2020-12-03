const connection = require('../connection/connection');

let obj = null;

class Student 
{
    static createObj()
    {
        obj = obj === null ? new Student() : obj;
        return obj;
    }

    insertStudent = async (name,guardianName,courseId,branchId,year,semester) => {
        try
        {
            let promise = new Promise((resolve,reject) => {
                let query = 'INSERT INTO students VALUES (0,?,?,?,?,?,?);';
                connection.query(query,[name,guardianName,courseId,branchId,year,semester],(err,result) => {
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
            console.log('error while inserting the student record ' + err.message);
            return err;
        }
    }

    updateStudent = async (studentId,name,guardianName,courseId,branchId,year,semester) => {
        try
        {
            let promise = new Promise((resolve,reject) => {
                let query = 'UPDATE students SET name = ? ,  guardian_name = ? , branch_id = ? , course_id = ?, year = ? , semester = ? WHERE student_id = ?';
                connection.query(query,[studentId,name,guardianName,courseId,branchId,year,semester],(err,result) => {
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
            console.log('error while updating the student record ' + err.message);
            return err;
        }
    }

    deleteStudent = async (studentId) => {
        try
        {
            let promise = new Promise((resolve,reject) => {
                let query = 'DELETE FROM students WHERE student_id = ?';
                connection.query(query,[studentId],(err,result) => {
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
            console.log('error while deleting the student record ' + err.message);
            return err;
        }
    }
}

module.exports = Student;