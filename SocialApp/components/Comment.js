import React from "react";

const Comment = (props) => {
    return (
        <div>
            <div>
                <img src = {props.image} />
            </div>
            <div>
                <h3>{props.username}</h3>
                <h5>{props.created_at}</h5>
            </div>
        </div>
    )
}
export default Comment;