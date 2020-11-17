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
    return(
        <nav>
            {msg && <h4 className = 'msg'>{msg}</h4>}
            <div>
                <Link to = '/'>Chat App</Link>
            </div>
            <div>
                <Link to = '/register'>Register</Link>
                <Link to = '/viewUsers'>View Users</Link>
                {isLoggedIn || <Link to = '/login'>LogIn</Link>}
                {isLoggedIn && <button onClick = {() => {handleLogout()}}>Log Out {crntUser.username}</button>}
                {isLoggedIn && <Link to = '/friendRequests'>View Friend Requests</Link>}
                {isLoggedIn && <Link to = '/friends'>View Friends</Link>}
            </div>
        </nav>
    )
}
export default Nav;