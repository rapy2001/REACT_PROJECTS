import React from "react";
import {Link} from "react-router-dom";
const Friend = ({user_id,username,image,log_status}) => {
    return (
        <div className = 'user'>
            <div className = 'user_box_1'>
                <img src = {image} alt = {username}/>
            </div>
            <div className = 'user_box_2'>
                <h4>{username}</h4>
                <h4>{log_status == 1 ? 'Online' : 'Offline'}</h4>
                <Link className = 'btn' to = {`/${user_id}/chat`}>Message</Link>
            </div>
        </div>
    )
}
export default Friend; 