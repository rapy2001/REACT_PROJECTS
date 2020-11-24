import React from "react";

const Message = ({message_text,created_at,crntUser,from_id,to_id}) => {
    const name = crntUser.id === from_id ? 'basic owner' : 'basic friend';
    const main = crntUser.id === from_id ? 'owner_div' : 'friend_div';
    const dateVal = new Date(created_at).toLocaleString();
    return (
        <div className = {main}>
            <div className = {name}>
                <h4>{dateVal}</h4>
                <h3>{message_text}</h3>
            </div>
        </div>
        
    )
}   
export default Message;