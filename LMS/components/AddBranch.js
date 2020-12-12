import React from "react";
import Axios from "axios";
import {useHistory} from "react-router-dom";
const AddBranch = (props) => {
    const [courses,setCourses] = React.useState([]);
    const [branch,setBranch] = React.useState({
        branchName:'',
        courseId:0
    })
    let history = useHistory();
    const fetchCourses = () => {
        Axios.get('http://localhost:5000/getCourses')
        .then((response) => {
            if(response.data.flg === 1)
            {
                setCourses(response.data.courses);
            }
            else
            {
                props.showMessage('Error while loading the Courses');
                setTimeout(() => {
                    history.push('/');
                },2500);

            }
        })
        .catch((err) => {
            props.showMessage('Server not responding');
            setTimeout(() => {
                history.push('/')
            },2500);
        })
    }
    const handleChange = (e) => {
        setBranch({
            ...branch,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:5000/addBranch',branch)
        .then((response) => {
            if(response.data.flg === 1)
            {
                setBranch({
                    branchName:'',
                    courseId:0
                })
                props.showMessage('Branch added successfully');
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
    React.useEffect(() => {
        fetchCourses();
    },[])
    if(props.isLoggedIn)
    {
        let courseOptions = [];
        if(courses.length > 0)
        {
            courseOptions = courses.map((course) => {
                return (
                    <option key = {course.course_id} value = {course.course_id}>{course.course_name}</option>
                )
            })
        }
        if(props.crntUser.type === 1)
        {
            return (
                <div className = 'addBranch box'>
                    <div className = 'box_1'>
                        <form className = 'form' onSubmit = {handleSubmit}>
                            <h3>Add a Branch</h3>
                            <input
                                type = 'text'
                                name = 'branchName'
                                value = {branch.branchName}
                                onChange = {handleChange}
                                placeholder = 'Branch Name' 
                                autoComplete = 'off'
                            />
                            <div className = 'selection'>
                                <label>Course:</label>
                                <select
                                    name = 'courseId'
                                    value = {branch.courseId}
                                    onChange = {handleChange}
                                >
                                    <option value = {0}>--SELECT--</option>
                                    {courseOptions}
                                </select>
                            </div>
                            <button className = 'btn' type = 'submit'>
                                Add Branch
                            </button>
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
                    <h4>Only Administrators can add Branches</h4>
                </div>
            )
        }
    }
    else
    {
        return (
            <div className = 'empty'>
                <h4>Please Log in as Admin</h4>
            </div>
        )
    }
}
export default AddBranch;