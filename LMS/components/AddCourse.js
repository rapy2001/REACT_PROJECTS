import React from "react";
import Axios from "axios";
import {useHistory} from "react-router-dom";
const AddCourse = (props) => {
    let history = useHistory();
    const[course,setCourse] = React.useState({
        courseName:'',
        years:-1,
        semesters:-1
    })

    const handleChange = (e) => {
        setCourse({
            ...course,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(course.courseName === '' || course.years === -1 || course.semesters === -1)
        {
            props.showMessage('Please enter all course details');
        }
        else
        {
            Axios.post('http://localhost:5000/addCourse',course)
            .then((response) => {
                if(response.data.flg === 1)
                {
                    props.showMessage('Course added Successfully');
                    setCourse({
                        courseName:'',
                        years:-1,
                        semesters:-1
                    })
                    setTimeout(() => {
                        history.push('/');
                    },2500)
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
    }
    if(props.isLoggedIn)
    {
        if(props.crntUser.type === 1)
        {
            return (
                <div className = 'box addCourse'>
                    <div className = 'box_1'>
                        <form className = 'form' onSubmit = {handleSubmit}>
                            <h3>Add a Course</h3>
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
                            <button className = 'btn' type = 'submit'>Add Course</button>
                        </form>
                    </div>
                    <div className = 'box_2'>
                        <h3>LMS</h3>
                    </div>
                </div>
            )
        }
        else
        {
            return (
                <div className = 'empty'>
                    <h4>Only Administartors can add a Course</h4>
                </div>
            )
        }
    }
    else
    {
        return (
            <div className = 'empty'>
                <h4>Log In as Administrator to add a Course</h4>
            </div>
        )
    }
}
export default AddCourse;