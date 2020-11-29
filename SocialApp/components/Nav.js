import React from "react";
import {Link} from "react-router-dom";
import Notifications from "./Notifications";
const Nav = (props) => {
    const [toggleNotif,setToggleNotif] = React.useState(false);
    return(
        <nav className = 'nav'>
            <div className = 'nav_box_1'>
                <Link to = '/'>SocialApp</Link>
            </div>
            <div className = 'nav_box_2'>
                {props.isLoggedIn || <Link to = '/register'><i className = 'fa fa-user-plus'></i></Link>}
                {props.isLoggedIn || <Link to = '/login'><i className = 'fa fa-long-arrow-right'></i></Link>}
                {props.isLoggedIn && <button onClick = {() => props.logout()}><i className = 'fa fa-long-arrow-left'></i>({props.crntUser.username})</button>}
                {props.isLoggedIn && <Link to = '/viewUsers'><i className = 'fa fa-users'></i></Link>}
                {props.isLoggedIn && <Link to = '/viewFriendRequest'>View Friend Requests</Link>}
                {props.isLoggedIn && <button onClick = {() => props.toggleForm(1)}><i className = 'fa fa-plus'></i></button>}
                {props.isLoggedIn &&  <Link to = '/viewFeed'><i className = 'fa fa-newspaper'></i></Link>}
                {props.isLoggedIn && <button onClick = {() => {setToggleNotif((prevState) => !prevState)}}><i className = 'fa fa-bell'></i></button>}
                {toggleNotif && <Notifications userId = {props.crntUser.userId} isLoggedIn = {props.isLoggedIn}/>}
            </div>
        </nav>
    )
}
export default Nav;