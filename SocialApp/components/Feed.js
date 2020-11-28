import React from "react";
import Post from "./Post";
import FullPost from "./FullPost";
import Profile from "./Profile";
const Feed = ({crntUser,isLoggedIn}) => {
    const [posts,setPosts] = React.useState([]);
    const [msg,setMsg] = React.useState('');
    const [showPost,setShowPost] = React.useState({
        flg:false,
        id:-1
    });
    const togglePost = (flg,postId) => {
        if(flg === 1)
            setShowPost({
                flg:true,
                id:postId
            })
        else
            setShowPost({
                flg:false,
                id:-1
            })
    }
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
                return <Post key = {post.post_id} {...post} crntUser = {crntUser} getFeed = {getFeed} togglePost = {togglePost}/>;
            })
            return (
                <div className = 'feed'>
                    {isLoggedIn && <Profile crntUser = {crntUser}/>}
                    <div className = 'feed_box'>
                        <h1>Your Posts</h1>
                        {msg && <h4 className = 'msg'>{msg}</h4>}
                        {showPost.flg && <FullPost postId = {showPost.id} togglePost = {togglePost}/>}
                        <div className = 'posts_box'>
                            {postAry}
                        </div>
                    </div>
                </div>
                
            )
        }
        else
        {
            return (
                <div className = 'feed'>
                    {isLoggedIn && <Profile crntUser = {crntUser}/>}
                    <div className ='empty'>
                        <h4>Feed is Empty ...</h4>
                    </div>
                </div>
               
            )
        }
    }
    else
    {
        return (
            <div className = 'empty'>
                <h4>Please Log In to View Feed</h4>
            </div>
        )
    }
}
export default Feed;