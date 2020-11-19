import React from "react";
import {Link} from "react-router-dom";
// import {obj} from "../App";
const Nav = ({isLoggedIn,logout,crntUser}) => {
    // let {isLoggedIn,logout,crntUser} = React.useContext(obj);
    let [msg,setMsg] = React.useState('');
    const handleLogout = () => {
        logout();
        setMsg('LoggedOut Successfully');
        setTimeout(function(){
            setMsg('');
        },2500);
    }
    const seed = () => {
        fetch('http://localhost/projects/ChatApp/API/seed.php')
        .then((response) => response.json())
        .then((data) => {
            if(data.flg === 1)
            {
                setMsg('Database Seeded Successfully');
                setTimeout(function(){
                    setMsg('');
                },2500);
            }
            else
            {
                setMsg('Error while seeding the database');
                setTimeout(function(){
                    setMsg('');
                },2500);
            }
        })
    }
    return(
        <nav className = 'nav'>
            {msg && <h4 className = 'msg'>{msg}</h4>}
            <div className = 'nav_box_1'>
                <Link to = '/'>Chat App</Link>
            </div>
            <div className = 'nav_box_2'>
                <Link to = '/register'>Register</Link>
                <Link to = '/viewUsers'>View Users</Link>
                {isLoggedIn || <Link to = '/login'>LogIn</Link>}
                {isLoggedIn && <button onClick = {() => {handleLogout()}} className = 'btn'>Log Out ({crntUser.username})</button>}
                {isLoggedIn && <Link to = '/friendRequests'>View Friend Requests</Link>}
                {isLoggedIn && <Link to = '/friends'>View Friends</Link>}
                {isLoggedIn ? crntUser.username === 'Admin' ? <button className = 'btn' onClick = {() => {seed()}}>Seed</button> : null : null}
            </div>
        </nav>
    )
}
export default Nav;