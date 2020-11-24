import React from "react";
// import {obj} from "../App";
import Friend from "./Friend";
import Axios from "axios";
const Friends = ({crntUser,isLoggedIn}) => {
    // let {crntUser,isLoggedIn} = React.useContext(obj);
    let interval = '';
    const [msg,setMsg] = React.useState('');
    const [friends,SetFriends] = React.useState([]);
    let val = {userId:crntUser.id};
    let data = JSON.stringify(val);
    const loadFriends = () => {
        // Axios.post("http://localhost/projects/ChatApp/API/getFriends.php",data)
        // .then((response) => {
            // if(response.data.flg == 1)
            // {
            //     SetFriends(response.data.friends);
            // }
            // else
            // {
            //     setMsg('Error While Loading the Friends');
            //     setTimeout(function(){
            //         setMsg('');
            //     },2500);
            // }
        // })
        // .catch((err) => {
        //     setMsg('Internal Server Error');
        //     setTimeout(function(){
        //         setMsg('');
        //     },2500);
        // })
        fetch('http://192.168.0.6:5000/getFriends/' + crntUser.id,{
            method:'GET',
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            if(data.flg === 1)
            {
                SetFriends(data.users);
            }
            else
            {
                setMsg('Error While Loading the Friends');
                setTimeout(function(){
                    setMsg('');
                },2500);
            }

        })
        .catch((err) => {
            setMsg('No Response From the Server');
            setTimeout(function(){
                setMsg('');
            },2500)
        })
    }
    React.useEffect(() => {
        loadFriends();
        interval = setInterval(function(){
            loadFriends();
        },1000)
        return () => {
            clearInterval(interval);
        }
    },[])
    if(isLoggedIn)
    {
        if(friends.length > 0)
        {
            return(
                <div className = 'users'>
                    {msg && <h4 className = 'msg'>{msg}</h4>}
                    <div className = 'users_box'>
                        <h1>Your Friends</h1>
                        {
                            friends.map((friend) => {
                                return <Friend crntUser = {crntUser}key = {friend.user_id} {...friend}/>
                            })
                        }
                    </div>
                    
                </div>
            )
        }
        else
        {
            return (
                <div className = 'empty'>
                    <h4>No Friends Yet ...</h4>
                </div>
            )
        }
    }
    else
    {
        return (
            <div className = 'empty'>
                <h4>Please Log in to View Friends</h4>
            </div>
        )
    }
}
export default Friends;