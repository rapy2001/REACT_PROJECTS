import React from "react";

const User = ({username,image,id,status}) => {
    return (
        <div>
            <div>
                <img src = {image} alt = {username}/>
            </div>
            <div>
                <h4>{username}</h4>
                {status == 1 ? null : <button type = 'button'>Send Friend Request</button>}
            </div>
        </div>
    )
}
export default User;