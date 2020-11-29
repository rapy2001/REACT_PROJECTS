import React from "react";
import Comment from "./Comment";
import AddComment from "./AddComment";
const FullPost = ({postId,togglePost,crntUser}) => {
    let interval = null;
    const [post,setPost] = React.useState([]);
    const [comments,setComments] = React.useState([]);
    const [commentLoadError,setCommentLoadError] = React.useState(false); 
    const [toggleForm,setToggleForm] = React.useState(false);
    const toggleCommentForm = (flg) => {
        if(flg === 1)
        {
            setToggleForm(true);
        }
        else
        {
            setToggleForm(false);
        }
    }
    const [error,setError] = React.useState({
        flg:false,
        message:''
    });
    const fetchComments = () => {
        fetch(`http://192.168.0.6:5000/getComments/${postId}`,{
            method:'GET'
        })
        .then((response) => {
            return  response.json();
        })
        .then((data) => {
            
            if(data.flg === 1)
            {
                // console.log(data.comments);
                setComments(data.comments);
                setCommentLoadError(false);
            }
            else
            {
                setCommentLoadError(true);
            }
        })
        .catch((err) => {
            console.log('hello');
            setCommentLoadError(true);
        })
    }
    const fetchPost = () => {
        fetch(`http://localhost:5000/getPost/${postId}`,{
            method:'GET'
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            if(data.flg === 1)
            {
                setPost(data.post);
            }
            else
            {
                setError({
                    flg:true,
                    message:'Internal Server Error'
                });
            }
        })
        .catch((err) => {
            setError({
                flg:true,
                message:'No Response from Server'
            });
        })
    }
    React.useEffect(() => {
        fetchPost();
        fetchComments();
        interval = setInterval(function(){
            fetchPost();
            fetchComments();
        },3000)
        return () => {
            clearInterval(interval);
        }
    },[])
    if(error.flg)
    {
        return (
            <div>
                <div>
                    <h4 onClick = {() => {togglePost(0,-1)}}><i className = 'fa fa-times'></i></h4>
                </div>
                <div>
                    <h3>{error.message}</h3>
                </div>
            </div>
        )
    }
    else
    {
        let commentsAry = [];
        if(comments.length > 0)
            commentsAry = comments.map((comment) => {
                return (<Comment {...comment}/>)
            })
        return (
            <div>
                {toggleForm && <AddComment crntUser = {crntUser} postId = {postId} toggleCommentForm = {toggleCommentForm}/>}
                <div>
                    <h4 onClick = {() => {togglePost(0,-1)}}><i className = 'fa fa-times'></i></h4>
                </div>
                <div>
                    <div>
                        <h3>{post.title}</h3>
                        <h4>{post.created_at}</h4>
                    </div>
                    <div>
                        <img src = {post.image} alt = {post.title} />
                    </div>
                    <div>
                        <p>
                            {post.description}
                        </p>
                    </div>
                    <div>
                        <h2>Comments:</h2>
                        <button onClick = {() => {toggleCommentForm(1)}}>Add a Comment</button>
                        {commentLoadError && <h4>Error While loading the Comments</h4>}
                        {comments.length > 0 ? <div>{commentsAry}</div>:<h4>No Comments Yet</h4>}
                    </div>
                </div>
            </div>
        )
    }
    
}
export default FullPost;