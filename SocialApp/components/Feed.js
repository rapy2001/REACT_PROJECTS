import React from "react";
import Post from "./Post";
const Feed = ({crntUser,isLoggedIn}) => {
    const [posts,setPosts] = React.useState([]);
    const [msg,setMsg] = React.useState('');
    let interval = null;
    const getFeed = () => {
        fetch(`http://192.168.0.6:5000/getFeed/${crntUser.userId}`,{
            method:'GET'
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.flg === 1)
            {
                setPosts(data.posts);
            }
            else
            {
                setMsg('Error while getting your Feed');
                setTimeout(function(){
                    setMsg('');
                },2500)
            }
        })
        .catch((err) => {
            setMsg('No Response from the server ' + err.message);
            setTimeout(function(){
                setMsg('');
            },2500)
        })
    }
    React.useEffect(() => {
        getFeed();
        interval = setInterval(function(){
            getFeed();
        },5000)
        return () => {
            clearInterval(interval);
        }
    },[])
    if(isLoggedIn)
    {
        if(posts.length > 0)
        {
            let postAry = posts.map((post) => {
                return <Post key = {post.post_id} {...post}/>;
            })
            return (
                <div>
                    <h1>Your Posts</h1>
                    {msg && <h4>{msg}</h4>}
                    <div>
                        {postAry}
                    </div>
                </div>
            )
        }
        else
        {
            return (
                <div>
                    <h4>Feed is Empty ...</h4>
                </div>
            )
        }
    }
    else
    {
        return (
            <div>
                <h4>Please Log In to View Feed</h4>
            </div>
        )
    }
}
export default Feed;