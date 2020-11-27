import React from "react";
import {Link} from "react-router-dom";
const Nav = (props) => {
    return(
        <nav>
            <div>
                <h3>SocialApp</h3>
            </div>
            <div>
                <Link to = '/register'>Register</Link>
                {props.isLoggedIn || <Link to = '/login'>Log In</Link>}
                {props.isLoggedIn && <button onClick = {() => props.logout()}>LogOut ({props.crntUser.username})</button>}
                {props.isLoggedIn && <Link to = '/viewUsers'>View Users</Link>}
                {props.isLoggedIn && <Link to = '/viewFriendRequest'>View Friend Requests</Link>}
                {props.isLoggedIn && <button onClick = {() => props.toggleForm(1)}>Create Post</button>}
            </div>
        </nav>
    )
}
export default Nav;