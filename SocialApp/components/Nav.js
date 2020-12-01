import React from "react";
import {Link} from "react-router-dom";
import Notifications from "./Notifications";

const Nav = (props) => {
    const [toggleNotif,setToggleNotif] = React.useState(false);
    const [msg,setMsg] = React.useState('');
    const seed = () => {
        fetch('http://localhost:5000/seed')
        .then((response) => response.json())
        .then((data) => {
            if(data.flg === 1)
            {
                setMsg('Database seeded successfully');
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
        .catch((err) => {
            setMsg('No response from the server');
            setTimeout(function(){
                setMsg('');
            },2500);  
        })
    }
    return(
        <nav className = 'nav'>
            {msg && <h4>{msg}</h4>}
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
                {props.isLoggedIn &&  <Link to = '/viewFeed'><i className = 'fa fa-list'></i></Link>}
                {props.isLoggedIn && <button onClick = {() => {setToggleNotif((prevState) => !prevState)}}><i className = 'fa fa-bell'></i></button>}
                {toggleNotif && <Notifications userId = {props.crntUser.userId} isLoggedIn = {props.isLoggedIn}/>}
                {props.crntUser.username === 'Admin' ? <button onClick = {seed}>Seed</button> : null}
            </div>
        </nav>
    )
}
export default Nav;