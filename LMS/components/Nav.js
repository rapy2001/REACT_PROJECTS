import React from "react";
import {Link} from "react-router-dom";
const Nav = ({isLoggedIn,crntUser,logout}) => { 
    return (
        <nav>
            <div>
                <Link to = '/'>LMS</Link>
            </div>
            <div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div>
                {isLoggedIn ? crntUser.type === 1 ? <Link to = '/addStudent'>Add a Student</Link>:null : null}
                {isLoggedIn || <Link to = '/login'>Log In</Link>}
                {isLoggedIn && <button onClick = {() => logout()}>Log Ou</button>}
            </div>
        </nav>
    )
}
export default Nav;