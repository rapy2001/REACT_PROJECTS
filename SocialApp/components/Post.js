import React from "react";
const Post = (props) => {
    let description = null;
    if(props.description.length > 50)
        description = props.description.substring(0,50) + ' ...';
    else
        description = props.description;
    return (
        <div>
            <div>
                <img src = {props.image} alt = {props.title}/>
            </div>
            <div>
                <h3>{props.title}</h3>
                <p>
                    {description} 
                </p>
                <h5>Posted on :{new Date(props.created_at).toLocaleString()}</h5>
                <div>
                    <h4>Likes: {props.likes.length}</h4>
                    <h4>By: {props.username}</h4>
                </div>
            </div>
        </div>
    )
}
export default Post;