import React from "react";

const Comment = (props) => {
    return (
        <div className = 'comment'>
            <div className = 'comment_box_1'>
                <img src = {props.image} />
            </div>
            <div className = 'comment_box_2'>
                <h3><b>{props.username}</b>{props.comment}</h3>
                <h5>{new Date(props.created_at).toLocaleString()}</h5>
            </div>
        </div>
    )
}
export default Comment;