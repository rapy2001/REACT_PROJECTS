import React from "react";
import Axios from "axios";
const ViewCourses = (props) => {
    const [courses,setCourses] = React.useState([]);
    const [showForm,setShowForm] = React.useState(false);
    const [course,setCourse] = React.useState({
        courseName:'',
        years:0,
        semesters:0,
        courseId:-1
    })
    const getCourses = () => {
        Axios.get('http://localhost:5000/getCourses')
        .then((response) => {
            if(response.data.flg === 1)
            {
                setCourses(response.data.courses);
            }
            else
            {
                props.showMessage('Error while loading the Courses');
            }
        })
        .catch((err) => {
            props.showMessage('No response from the Server');
        })
    }

    const handleDelete = (e) => {
        // console.log(e.target.dataset);
        Axios.post('http://localhost:5000/deleteCourse',{courseId:e.target.dataset.id})
        .then((response) => {
            if(response.data.flg === 1)
            {
                props.showMessage('Course deleted Successfully');
                getCourses();
            }
            else
            {
                props.showMessage('Internal Server Error');
            }
        })
        .catch((err) => {
            props.showMessage('No Response from the Server');
        })
    }
    const handleUpdate = (e) => {
        // console.log(e.target.dataset);
        Axios.get(`http://localhost:5000/getCourse/${e.target.dataset.id}`)
        .then(async (response) => {
            if(response.data.flg === 1)
            {
                await setCourse({
                    courseName:response.data.course.course_name,
                    years:response.data.course.years,
                    semesters:response.data.course.semesters,
                    courseId:response.data.course.course_id
                });
                setShowForm(true);
            }
            else
            {
                props.showMessage('Internal Server Error')
            }
        })
        .catch((err) => {
            props.showMessage('No Response from the Server');
        })
        setShowForm(true);
    }
    const handleChange = (e) => {
        setCourse({
            ...course,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(course);
        if(course.courseName === '' || course.years === -1 || course.semesters === -1)
        {
            props.showMessage('Please enter all course details');
        }
        else
        {
            Axios.post('http://localhost:5000/updateCourse',course)
            .then((response) => {
                if(response.data.flg === 1)
                {
                    props.showMessage('Course Updated Successfully');
                    setCourse({
                        courseName:'',
                        years:-1,
                        semesters:-1
                    })
                    getCourses();
                    setShowForm(false);
                }
                else
                {
                    props.showMessage('Internal Server Error');
                    setShowForm(false);
                }
            })
            .catch((err) => {
                props.showMessage('No Response from the Server');
                setShowForm(false);
            })
        }
    }
    React.useEffect(() => {
        getCourses();
    },[])
    if(props.isLoggedIn)
    {
        if(props.crntUser.type === 1)
        {
            if(courses.length > 0)
            {
                let coursesAry = [];
                coursesAry = courses.map((course) => {
                    return (
                        <tr key = {course.course_id}>
                            <td>
                                {course.course_name}
                            </td>
                            <td>
                                {course.years}
                            </td>
                            <td>
                                {course.semesters}
                            </td>
                            <td className = 'upd' data-id = {course.course_id} onClick = {handleUpdate}>
                                Update
                            </td>
                            <td className = 'dlt' data-id = {course.course_id} onClick = {handleDelete}>
                                Delete
                            </td>
                        </tr>
                    )
                })
                return (
                    <div className = 'courses_container'>
                        <h1>Courses</h1>
                        {
                            showForm 
                                && 
                            <div className = 'upd_form_div'>
                                <div className = 'upd_form_cut'>
                                    <h4 onClick = {() => setShowForm(false)}><i className = 'fa fa-times'></i></h4>
                                </div>
                                <div className = 'course_form_box'>
                                    <form className = 'form' onSubmit = {handleSubmit}>
                                        <h3>Update Course</h3>
                                        <input
                                            type = 'text'
                                            placeholder = 'Course Name'
                                            value = {course.courseName}
                                            name = 'courseName'
                                            autoComplete = 'off'
                                            onChange = {handleChange} 
                                        />
                                        <div className = 'selection'>
                                            <label>Years:</label>
                                            <input
                                                type = 'number'
                                                placeholder = 'Years'
                                                step = '1'
                                                min = '0'
                                                value = {course.years}
                                                name = 'years'
                                                autoComplete = 'off'
                                                onChange = {handleChange} 
                                            />
                                        </div>
                                        <div className = 'selection'>
                                            <label>Semesters</label>
                                            <input
                                                type = 'number'
                                                placeholder = 'Semesters'
                                                step = '1'
                                                min = '0'
                                                value = {course.semesters}
                                                name = 'semesters'
                                                autoComplete = 'off'
                                                onChange = {handleChange} 
                                            />
                                        </div>
                                        <button className = 'btn' type = 'submit'>Update Course</button>
                                    </form>
                                </div>
                            </div>
                        }
                        <div className = 'courses_box'>
                            <table className = 'table'>
                                <thead>
                                    <tr>
                                        <th>
                                            Course Name
                                        </th>
                                        <th>
                                            Years
                                        </th>
                                        <th>
                                            Semesters
                                        </th>
                                        <th>
                                            Update
                                        </th>
                                        <th>
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coursesAry}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
            else
            {
                return (
                    <div className = 'courses_container'>
                        <h1>Courses</h1>
                        <div className = 'courses_box'>
                            <table className = 'table'>
                                <thead>
                                    <tr>
                                        <th>
                                            Course Name
                                        </th>
                                        <th>
                                            Years
                                        </th>
                                        <th>
                                            Semesters
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            No Courses
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
        }
        else
        {
            return (
                <div className = 'empty'>
                    <h4>Only Adminstrators can access this page</h4>
                </div>
            )
        }
    }
    else
    {
        return (
            <div className = 'empty'>
                <h4>Please Log In as Administrator to View Courses</h4>
            </div>
        )
    }
}
export default ViewCourses;