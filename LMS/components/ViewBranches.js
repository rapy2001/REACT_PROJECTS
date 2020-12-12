import React from "react";
import Axios from "axios";
import {useHistory} from "react-router-dom";
const ViewBranches = (props) => {
    let history = useHistory();
    const [branches,setBranches] = React.useState([]);
    const [courses,setCourses] = React.useState([]);
    const [course,setCourse] = React.useState(0);
    const [showForm,setShowForm] = React.useState(false);
    const[branch,setBranch] = React.useState({
        branchName:'',
        branchId:0
    })
    const handleChnage = (e) => {
        setCourse(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchBranches(course);
    }
    const fetchBranches = (courseId) => {
        Axios.get(`http://localhost:5000/getBranches/${courseId}`)
        .then((response) => {
            if(response.data.flg === 1)
            {
                setBranches(response.data.branches);
            }
            else
            {
                props.showMessage('Error while loading the Branches for the Course');
            }
        })
        .catch((err) => {
            props.showMessage('No Response from the Server');
        })
    }
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
    React.useEffect(() => {
        fetchCourses();
    },[])
    const handleDelete = (e) => {
        // console.log(e.target.dataset);
        Axios.post('http://localhost:5000/deleteBranch',{branchId:e.target.dataset.id})
        .then((response) => {
            if(response.data.flg === 1)
            {
                props.showMessage('Branch deleted Successfully');
                fetchBranches(course);
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
        Axios.get(`http://localhost:5000/getBranch/${e.target.dataset.id}`)
        .then(async (response) => {
            if(response.data.flg === 1)
            {
                await setBranch({
                    branchName:response.data.branch.branch_name,
                    branchId:response.data.branch.branch_id
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
    const handleBranchChange = (e) => {
        setBranch({
            ...branch,
            [e.target.name]:e.target.value
        })
    }

    const handleBranchSubmit = (e) => {
        e.preventDefault();
        // console.log(course);
        if(branch.branchName === '' || branch.branchId === 0)
        {
            props.showMessage('Please enter new Branch Name');
        }
        else
        {
            Axios.post('http://localhost:5000/updateBranch',branch)
            .then((response) => {
                if(response.data.flg === 1)
                {
                    props.showMessage('Branch Updated Successfully');
                    setBranch({
                        branchName:'',
                        branchId:0
                    })
                    fetchBranches(course);
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
    if(props.isLoggedIn)
    {
        if(props.crntUser.type === 1)
        {
            let branchOptions = [];
            if(branches.length > 0)
            {
                branchOptions = branches.map((branch) => {
                    return (
                        <tr key = {branch.branch_id}>
                            <td>
                                {branch.branch_name}
                            </td>
                            <td>
                                {branch.course_name}
                            </td>
                            <td className = 'upd' data-id = {branch.branch_id} onClick = {handleUpdate}>
                                Update
                            </td>
                            <td className = 'dlt' data-id = {branch.branch_id} onClick = {handleDelete}>
                                Delete
                            </td>
                        </tr>
                    )
                })
            }
            let courseOptions = [];
            if(courses.length > 0)
            {
                courseOptions = courses.map((course) => {
                    return (
                        <option key = {course.course_id} value = {course.course_id}>{course.course_name}</option>
                    )
                })
            }
            let courseName = null;
            for(let i = 0; i < courses.length; i++)
            {
                if(courses[i].course_id == course)
                {
                    courseName = courses[i].course_name;
                    break;
                }   
            }
            return (
                <div className = 'courses_container viewBranches'>
                    {
                    showForm 
                    && 
                        <div className = 'upd_form_div'>
                            <div className = 'upd_form_cut'>
                                <h4 onClick = {() => setShowForm(false)}><i className = 'fa fa-times'></i></h4>
                            </div>
                            <div className = 'course_form_box'>
                                <form className = 'form' onSubmit = {handleBranchSubmit}>
                                    <h3>Update Branch</h3>
                                    <input
                                        type = 'text'
                                        placeholder = 'Branch Name'
                                        value = {branch.branchName}
                                        name = 'branchName'
                                        autoComplete = 'off'
                                        onChange = {handleBranchChange} 
                                    />
                                    <button className = 'btn' type = 'submit'>Update Branch</button>
                                </form>
                            </div>
                        </div>        
                    }
                    <div className = 'viewBranches_box'>
                        <form className = 'form' onSubmit = {handleSubmit}>
                            <h3>Select Course</h3>
                            <select
                                name = 'course'
                                value = {course}
                                onChange = {handleChnage}
                            >
                                <option value = {0}>--SELECT--</option>
                                {courseOptions}
                            </select>
                            <button className = 'btn'>Submit</button>
                        </form>
                    </div>
                    <h1>Selected Course : {courseName === null ? 'No Course Selected' : courseName}</h1>
                    <h2>Branches</h2>
                    <div className = 'courses_box'>
                        <table className = 'table'>
                            <thead>
                                <tr>
                                    <th>
                                        Branch Name
                                    </th>
                                    <th>
                                        Course Name
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
                                    {branchOptions.length > 0 ? branchOptions : <tr id = 'empty_row'><td>No Branches / No Course Selected</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
        else
        {
            return (
                <div className = 'empty'>
                    <h4>Only Administrators can access this Page</h4>
                </div>
            )
        }
    }
    else
    {
        return (
            <div className = 'empty'>
                <h4>Please Log In as Admin</h4>
            </div>
        )
    }
}
export default ViewBranches;