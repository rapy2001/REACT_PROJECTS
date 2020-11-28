import React from "react";
const Post = (props) => {
    const [msg,setMsg] = React.useState('');
    const likePost = () => {
        fetch('http://localhost:5000/likePost',{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body:JSON.stringify({userId:props.crntUser.userId,postId:props.post_id})
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data.flg === 1)
            {
                props.getFeed();
            }
            else
            {
                setMsg('Error while adding the message');
                setTimeout(function(){
                    setMsg('');
                },2500);
            }
        })
        .catch((err) => {
            setMsg('Error while adding the message ' + err.message);
            setTimeout(function(){
                setMsg('');
            },2500);   
        })
    }
    const unLikePost = () => {
        fetch('http://localhost:5000/unLikePost',{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body:JSON.stringify({userId:props.crntUser.userId,postId:props.post_id})
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data.flg === 1)
            {
                props.getFeed();
            }
            else
            {
                setMsg('Error while adding the message');
                setTimeout(function(){
                    setMsg('');
                },2500);
            }
        })
        .catch((err) => {
            setMsg('Error while adding the message ' + err.message);
            setTimeout(function(){
                setMsg('');
            },2500);   
        })
    }
    let description = null;
    if(props.description.length > 50)
        description = props.description.substring(0,50) + ' ...';
    else
        description = props.description;
    return (
        <div className = 'single_post' onClick = {() => {props.togglePost(1,props.post_id)}}>
            <div className = 'post_box_1'>
                <img src = {props.image} alt = {props.title}/>
            </div>
            <div className = 'post_box_2'>
                <h3>{props.title}</h3>
                <p>
                    {description} 
                </p>
                <h5>{new Date(props.created_at).toLocaleString()}</h5>
                <div className = 'post_box_3'>
                    <div>
                        {props.likeStatus === 1 ? <button className = 'liked' onClick = {unLikePost}><i className = 'fa fa-heart'></i></button> : <button onClick = {likePost}><i className = 'fa fa-heart'></i></button>}
                        <h4>{props.likes.length}</h4>
                    </div>
                    <h4>{props.username}</h4>
                </div>
            </div>
        </div>
    )
}
export default Post;