import React from "react";
import Axios from "axios";
import {useHistory} from "react-router-dom";
const AddStudent = (props) => {
    let history = useHistory();
    const [courses,setCourses] = React.useState([]);
    const [branches,setBranches] = React.useState([]);
    const [student,setStudent] = React.useState({
        name:'',
        guardianName:'',
        courseId:'',
        branchId:'',
        year:'',
        semester:''
    })
    const handleChange = async (e) => {
        // console.log(e.target.name);
        if(e.target.name === 'courseId')
            fetchBranches(e.target.value);
        await setStudent({
            ...student,
            [e.target.name]:e.target.value
        })
        
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(student.name === '' || student.guardianName === '' || student.courseId === '' || student.year === '' || student.semester === '' || student.branchId === '')
        {
            props.showMessage('Please all Student Details');
        }
        else
        {
            Axios.post('http://localhost:5000/addStudent',student)
            .then((response) => {
                if(response.data.flg === 1)
                {
                    props.showMessage('Student Added Successfully');
                    setStudent({
                        name:'',
                        guardianName:'',
                        courseId:'',
                        branchId:'',
                        year:'',
                        semester:''
                    })
                    setTimeout(() => {
                        history.push('/');
                    },2500)
                }
                else
                {
                    props.showMessage('Server Error');
                }
            })
            .catch((err) => {
                props.showMessage('No response from server');
            })
        }
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
                props.showMessage('Internal Server Error while fetching the Courses');
            }
        })
        .catch((err) => {
            props.showMessage('No Response from Server');
        })
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
                props.showMessage('Internal Server Error while fetching the Branches');
            }
        })
        .catch((err) => {
            props.showMessage('No Response from Server');
        })
    }
    React.useEffect(() => {
        if(props.isLoggedIn && props.crntUser.type === 1)
            fetchCourses();
    },[])
    
    if(props.isLoggedIn)
    {
        if(props.crntUser.type === 1)
        {
            let courseOptions = courses.map((course) => {
                return (
                    <option key = {course.course_id} value = {course.course_id}>{course.course_name}</option>
                )
            })
            let branchOptions = branches.map((branch) => {
                return (
                    <option key = {branch.branch_id} value = {branch.branch_id}>{branch.branch_name}</option>
                )
            })
            let yrs = [];
            let sems = []
            for(let i = 0; i<courses.length; i++)
            {
                // console.log(courses[i].course_id,Number(student.courseId));
                if(courses[i].course_id === Number(student.courseId))
                {
                    for(let j = 0; j<Number(courses[i].years); j++)
                    {
                        yrs.push(<option key = {j} value = {j + 1}>{j + 1}</option>)
                    }
                    for(let j = 0; j<Number(courses[i].semesters); j++)
                    {
                        sems.push(<option key = {j} value = {j + 1}>{j + 1}</option>)
                    }
                    break;
                }
            }
           
            return (
                <div className = 'box addStudent'>
                    <div className = 'box_1'>
                        <form className = 'form' onSubmit = {handleSubmit}>
                            <h3>Add a Student</h3>
                            <input
                                type = 'text'
                                name = 'name'
                                value = {student.name}
                                onChange = {handleChange}
                                placeholder = 'Student Name'
                                autoComplete = 'off' 
                            />
                            <input
                                type = 'text'
                                name = 'guardianName'
                                value = {student.guardianName}
                                onChange = {handleChange}
                                placeholder = 'Guardian Name'
                                autoComplete = 'off' 
                            />
                            <div className = 'selection'>
                                <label>Course</label>
                                <select 
                                    value = {student.courseId} 
                                    name = 'courseId' 
                                    onChange = {handleChange}
                                >
                                    <option value = {-1}>--SELECT--</option>
                                    {courseOptions}
                                </select>
                            </div>
                            <div className = 'selection'>
                                <label>Branch</label>
                                <select 
                                    value = {student.branchId} 
                                    name = 'branchId' 
                                    onChange = {handleChange}
                                >
                                <option value = {-1}>--SELECT--</option>
                                {branchOptions}
                                </select>
                            </div>
                            <div className = 'selection'>
                                <label>Year</label>
                                <select 
                                    value = {student.year} 
                                    name = 'year' 
                                    onChange = {handleChange}
                                >
                                <option value = {-1}>--SELECT--</option>
                                {yrs}
                            </select>
                            </div>
                            <div className = 'selection'>
                                <label>Semester</label>
                                <select 
                                    value = {student.semester} 
                                    name = 'semester' 
                                    onChange = {handleChange}
                                >
                                <option value = {-1}>--SELECT--</option>
                                {sems}
                            </select>
                            </div>
                            
                            <button className = 'btn' type = 'submit'>Add Student</button>
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
                    <h4>Only Administrators can add Students</h4>
                </div>
            )
            
        }
    }
    else
    {
        return (
            <div className = 'empty'>
                <h4>Please Log In as Administrator</h4>
            </div>
        )
    }
}
export default AddStudent;