import React from "react";
import {Link} from "react-router-dom";
const Friend = ({user_id,username,image}) => {
    return (
        <div>
            <div>
                <img src = {image} alt = {username}/>
            </div>
            <div>
                <h3>{username}</h3>
                <Link to = {`/${user_id}/chat`}>Message</Link>
            </div>
        </div>
    )
}
export default Friend;