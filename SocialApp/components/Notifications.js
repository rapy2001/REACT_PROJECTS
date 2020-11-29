import React from "react";
import {Link} from "react-router-dom";
const Notification = (props) => {
    console.log(props);
    let style = props.status === 0 ? 'notRead' : null
    if(props.type === 1)
    {
        return (
            <Link to = '/viewFeed' className = {style}>
                <i className = 'fa fa-plus'></i>
                {props.username} added a Post
            </Link>
        )
    }
        
    else if(props.type === 2)
    {
        return (
            <Link to = '/viewFeed' className = {style}>
                <i className = 'fa fa-heart'></i>
                {props.username} added a Like
            </Link>
        )
    }   
    else
    {
        return (
            <Link to = '/viewFeed' className = {style}>
                <i className = 'fa fa-plus'></i>
                {props.username} added a Comment
            </Link>
        )
    }
                
}
const Notifications = ({userId,isLoggedIn}) => {
    const [notifications,setNotifications] = React.useState([]);
    const [loadError,setLoadError] = React.useState(false);
    const fetchNotifications = () => {
        fetch(`http://localhost:5000/getNotifications/${userId}`)
        .then((response) => response.json())
        .then((data) => {
            if(data.flg === 1)
            {
                setNotifications(data.notifications);
                setLoadError(false);
            }
            else
            {
                setLoadError(true);
            }
        })
        .catch((err) => {
            setLoadError(true);
        })
    }
    let interval = null;
    React.useEffect(() => {
        fetchNotifications();
        // interval = setInterval(() => {
        //     fetchNotifications();
        // },2000)
        // return () => {
        //     clearInterval(interval);
        // }
    })
    if(isLoggedIn)
    {
        if(loadError)
        {
            return (
                <div>
                    <h4>Error while loading the notifications</h4>
                </div>
            )
        }
        else
        {
            if(notifications.length > 0)
            {
                let ary = [];
                ary = notifications.map((notif) => {
                    return <Notification {...notif}/>
                })
                return (
                    <div className = 'notifs'>
                        <h3>Notifications</h3>
                        <div className = 'notif_box'>
                            {ary}
                        </div>
                    </div>
                )
            }
            else
            {
                return (
                    <div className = 'empty'>
                        <h4>No notifications yet</h4>
                    </div>
                )
            }
        }
        
    }
    else
    {
        return (
            <div className = 'empty'>
                <h4>Please Log In to view Your Notifications</h4>
            </div>
        )
    }
    
}
export default Notifications;