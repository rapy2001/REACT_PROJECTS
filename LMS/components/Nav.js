import React from "react";
import {Link} from "react-router-dom";
const Nav = ({isLoggedIn,crntUser,logout}) => { 
    return (
        <nav className = 'nav'>
            <div className = 'nav_box_1'>
                <Link to = '/'>LMS</Link>
            </div>
            <div className = 'nav_box_3'>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className = 'nav_box_2'>
                {isLoggedIn ? crntUser.type === 1 ? <Link to = '/addStudent'>Add a Student</Link>:null : null}
                {isLoggedIn ? crntUser.type === 1 ? <Link to = '/addCourse'>Add a Course</Link>:null : null}
                {isLoggedIn ? crntUser.type === 1 ? <Link to = '/viewCourses'>View Courses</Link>:null : null}
                {isLoggedIn || <Link to = '/login'>Log In</Link>}
                {isLoggedIn && <button onClick = {() => logout()}>Log Out ({crntUser.username})</button>}
            </div>
        </nav>
    )
}
export default Nav;