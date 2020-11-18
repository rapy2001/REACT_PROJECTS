import React from "react";
import {Link} from "react-router-dom";
const Friend = ({user_id,username,image,log_status}) => {
    return (
        <div>
            <div>
                <img src = {image} alt = {username}/>
            </div>
            <div>
                <h3>{username}</h3>
                <h3>{log_status == 1 ? 'Online' : 'Offline'}</h3>
                <Link to = {`/${user_id}/chat`}>Message</Link>
            </div>
        </div>
    )
}
export default Friend;