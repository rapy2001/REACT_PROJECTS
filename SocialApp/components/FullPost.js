import React from "react";

const FullPost = ({postId,togglePost}) => {
    let interval = null;
    const [post,setPost] = React.useState([]);
    const [error,setError] = React.useState({
        flg:false,
        message:''
    });
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
        interval = setInterval(function(){
            fetchPost();
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
        return (
            <div>
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
                    </div>
                </div>
            </div>
        )
    }
    
}
export default FullPost;