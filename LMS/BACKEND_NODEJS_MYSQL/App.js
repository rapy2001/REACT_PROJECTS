const express = require('express');
const cors = require('cors');
const env = require('dotenv');
const app = express();
const Book = require('./classes/Book');
const Student = require('./classes/Student');
const Course = require('./classes/Course');
const Branch = require('./classes/Branch');
const IssuedBooks = require('./classes/IssuedBooks');
env.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.post('/addBook',(req,res) => {
    if(req.body.name == undefined || req.body.isbn == undefined || req.body.publisher == undefined || req.body.edition == undefined || req.body.price == undefined || req.body.pages == undefined)
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

app.post('/updateBook',(req,res) => {
    if(req.body.bookId == undefined || req.body.name == undefined || req.body.isbn == undefined || req.body.publisher == undefined || req.body.edition == undefined || req.body.price == undefined || req.body.pages == undefined)
    {
        res.status(400).json({flg:-1});
    }
    else
    {
        let bookObj = Book.createObj();
        let updateBook = async () => {
            let promise = await bookObj.updateBook(req.body.bookId,req.body.name,req.body.isbn,req.body.publisher,req.body.edition,req.body.price,req.body.pages);
            if(promise.flg === 1)
            {
                res.json({flg:1});
            }
            else
            {
                res.status(500).json({flg:0});
            }
        }
        updateBook();
    }
})

app.post('/deleteBook',(req,res) => {
    if(req.body.bookId == undefined)
    {
        res.status(400).json({flg:-1});
    }
    else
    {
        const deleteBook = async () => {
            let bookObj = Book.createObj();
            let promise = await bookObj.deleteBook(req.body.bookId);
            if(promise.flg === 1)
            {
                res.json({flg:1});
            }
            else
            {
                res.status(500).json({flg:0});
            }
        }
        deleteBook();
    }
})

app.post('/addStudent',(req,res) => {
    if(req.body.name == undefined || req.body.guardianName == undefined || req.body.courseId == undefined || req.body.branchId == undefined || req.body.year == undefined || req.body.semester == undefined)
    {
        res.status(400).json({flg:-1});
    }
    else
    {
        const addStudent = async () => {
            let stuObj = Student.createObj();
            let promise = await stuObj.insertStudent(req.body.name,req.body.guardianName,req.body.courseId,req.body.branchId,req.body.year,req.body.semester);
            if(promise.flg === 1)
            {
                res.json({flg:1});
            }
            else
            {
                res.status(500).json({flg:0});
            }
        }
        addStudent();
    }
});

app.post('/updateStudent',(req,res) => {
    if(req.body.studentId == undefined || req.body.name == undefined || req.body.guardianName == undefined || req.body.courseId == undefined || req.body.branchId == undefined || req.body.year == undefined || req.body.semester == undefined)
    {
        res.status(400).json({flg:-1});
    }
    else
    {
        const updateStudent = async () => {
            let stuObj = Student.createObj();
            let promise = await stuObj.updateStudent(req.body.studentId,req.body.name,req.body.guardianName,req.body.courseId,req.body.branchId,req.body.year,req.body.semester);
            if(promise.flg === 1)
            {
                res.json({flg:1});
            }
            else
            {
                res.status(500).json({flg:0});
            }
        }
        updateStudent();
    }
})

app.post('/deleteStudent',(req,res) => {
    if(req.body.studentId == undefined)
    {
        res.status(400).json({flg:-1});
    }
    else
    {
        const deleteStudent = async () => {
            let stuObj = Student.createObj();
            let promise = await stuObj.deleteStudent(req.body.studentId);
            if(promise.flg === 1)
            {
                res.json({flg:1});
            }
            else
            {
                res.status(500).json({flg:0});
            }
        }
        deleteStudent();
    }
})

app.post('/addCourse',(req,res) => {
    if(req.body.courseName == undefined)
    {
        res.status(400).json({flg:-1});
    }
    else
    {
        const addCourse = async () => {
            let courseObj = Course.createObj();
            let promise = await courseObj.insertCourse(req.body.courseName);
            if(promise.flg === 1)
            {
                res.json({flg:1});
            }
            else
            {
                res.status(500).json({flg:0});
            }
        }
        addCourse();
    }
})

app.post('/updateCourse',(req,res) => {
    if(req.body.courseName == undefined || req.body.courseId == undefined)
    {
        res.status(400).json({flg:-1});
    }
    else
    {
        const updateCourse = async () => {
            let courseObj = Course.createObj();
            let promise = await courseObj.updateCourse(req.body.courseId,req.body.courseName);
            if(promise.flg === 1)
            {
                res.json({flg:1});
            }
            else
            {
                res.status(500).json({flg:0});
            }
        }
        updateCourse();
    }
})

app.post('/addBranch',(req,res) => {
    if(req.body.courseId == undefined || req.body.branchName == undefined)
    {
        res.status(400).json({flg:-1});
    }
    else
    {
        const addBranch = async () => {
            let branchObj = Branch.createObj();
            let promise = await branchObj.insertBranch(req.body.courseId,req.body.branchName);
            if(promise.flg === 1)
            {
                res.json({flg:1});
            }
            else
            {
                res.status(500).json({flg:0});
            }
        }
        addBranch();
    }
})

app.post('/updateBranch',(req,res) => {
    if(req.body.branchName == undefined || req.body.courseId == undefined || req.body.branchId == undefined)
    {
        res.status(400).json({flg:-1});
    }
    else
    {
        const updateBranch = async () => {
            let branchObj = Branch.createObj();
            let promise = await branchObj.updateBranch(req.body.branchId,req.body.courseId,req.body.branchName);
            if(promise.flg === 1)
            {
                res.json({flg:1});
            }
            else
            {
                res.status(500).json({flg:0});
            }
        }
        updateBranch();
    }
})

app.get('/getCourses',(req,res) => {
    const getCourses = async () => {
        let courseObj = Course.createObj();
        let promise = await courseObj.getCourses();
        if(promise.flg === 1)
        {
            res.json({flg:1,courses:promise.courses});
        }
        else
        {
            res.status(500).json({flg:0});
        }
    }
    getCourses();
})

app.get('/getBranches/:courseId',(req,res) => {
    if(req.params.courseId == undefined)
    {
        res.status(400).json({flg:-1});
    }
    else
    {
        const getCourses = async () => {
            let branchObj = Branch.createObj();
            let promise = await branchObj.getBranches(req.params.courseId);
            if(promise.flg === 1)
            {
                res.json({flg:1,branches:promise.branches});
            }
            else
            {
                res.status(500).json({flg:0});
            }
        }
        getCourses();
    }
})

app.get('/searchBook/:search',(req,res) => {
    if(req.params.search == undefined)
    {
        res.status(400).json({flg:-1});
    }
    else
    {
        let searchBook = async () => {
            let obj = Book.createObj();
            let promise = await obj.searchBook(req.params.search);
            res.json({flg:1,books:promise.books});
        }
        searchBook();
    }
})

app.post('/searchStudent',(req,res) => {
    if(req.body.name == undefined || req.body.courseId == undefined || req.body.branchId == undefined || req.body.year == undefined || req.body.semester == undefined)
    {
        res.status(400).json({flg:-1});
    }
    else
    {
        searchStudent = async () => {
            let obj = Student.createObj();
            let promise = await obj.searchStudent(req.body.name,req.body.courseId,req.body.branchId,req.body.year,req.body.semester);
            res.json({flg:1,students:promise.students});
        }
        searchStudent();
    }
})

app.post('/issueBook',(req,res) => {
    if(req.body.bookId == undefined || req.body.studentId == undefined)
    {
        res.status(400).json({flg:-1});
    }
    else
    {
        let issueBook = async () => {
            let obj = IssuedBooks.createObj();
            let promise = await obj.checkBookStatus(req.body.bookId);
            if(promise.flg === 1)
            {
                res.json({flg:2});
            }
            else
            {
                let promise = await obj.issueBook(req.body.bookId,req.body.studentId);
                if(promise.flg == 1)
                {
                    res.json({flg:1});
                }
                else
                {
                    res.status(500).json({flg:0});
                }
            }
        }
        issueBook();
    }
})
app.listen(process.env.PORT,() => {
    console.log(`Server listeining at port ${process.env.PORT}`);
})