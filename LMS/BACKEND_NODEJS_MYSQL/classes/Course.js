const connection = require('../connection/connection');

let obj = null;

class Course
{
    static createObj()
    {
        obj = obj === null ? new Course() : obj;
        return obj;
    }

    insertCourse = async (courseName) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'INSERT INTO courses VALUES (0,?)';
                connection.query(query,[courseName],(err,result) => {
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
            console.log('error while inserting the course ' + err.message);
            return err;
        }
    }

    updateCourse = async (courseId,courseName) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'UPDATE courses SET course_name = ? WHERE course_id = ?';
                connection.query(query,[courseName,courseId],(err,result) => {
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
            console.log('error while updating the course ' + err.message);
            return err;
        }
    }

    getCourses = async () => {
        try
        {
            let promise = new Promise((resolve,reject) => {
                let query = 'SELECT * FROM courses';
                connection.query(query,(err,results) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        resolve({flg:1,courses:results});
                    }
                })
            });
            return promise;
        }
        catch(err)
        {
            console.log('error while getting the courses + ' + err.message);
            return err;
        }
    }
}

module.exports = Course;