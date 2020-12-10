const connection = require('../connection/connection');

let obj = null;

class Course
{
    static createObj()
    {
        obj = obj === null ? new Course() : obj;
        return obj;
    }

    insertCourse = async (courseName,yrs,sems) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'INSERT INTO courses VALUES (0,?,?,?)';
                connection.query(query,[courseName,yrs,sems],(err,result) => {
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

    updateCourse = async (courseId,courseName,years,semesters) => {
        // console.log('hello');
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'UPDATE courses SET course_name = ? , years = ? , semesters = ? WHERE course_id = ?';
                connection.query(query,[courseName,years,semesters,courseId],(err,result) => {
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
    getCourse = async (courseId) => {
        try
        {
            let promise = new Promise((resolve,reject) => {
                let query = 'SELECT * FROM courses WHERE course_id = ?';
                connection.query(query,[courseId],(err,results) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        resolve({flg:1,course:results[0]});
                    }
                })
            });
            return promise;
        }
        catch(err)
        {
            console.log('error while getting the course + ' + err.message);
            return err;
        }
    }

    deleteCourse = async (courseId) => {
        try
        {
            let promise = await new Promise((resolve,reject) => {
                let query = 'DELETE FROM courses WHERE course_id = ?';
                connection.query(query,[courseId],(err,results) => {
                    if(err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
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
            console.log('error while deleting the Course ' + err.message);
            return err;
        }
    }
}

module.exports = Course;