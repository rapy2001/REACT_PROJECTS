import React from "react";
import {Link} from "react-router-dom";
const Nav = (props) => {
    return(
        <nav className = 'nav'>
            <div className = 'nav_box_1'>
                <Link to = '/'>SocialApp</Link>
            </div>
            <div className = 'nav_box_2'>
                <Link to = '/register'>Register</Link>
                {props.isLoggedIn || <Link to = '/login'>Log In</Link>}
                {props.isLoggedIn && <button onClick = {() => props.logout()}>LogOut ({props.crntUser.username})</button>}
                {props.isLoggedIn && <Link to = '/viewUsers'>View Users</Link>}
                {props.isLoggedIn && <Link to = '/viewFriendRequest'>View Friend Requests</Link>}
                {props.isLoggedIn && <button onClick = {() => props.toggleForm(1)}>Create Post</button>}
                {props.isLoggedIn &&  <Link to = '/viewFeed'>View Feed</Link>}
            </div>
        </nav>
    )
}
export default Nav;