import React from "react";
// import {obj} from "../App";
import Friend from "./Friend";
import Axios from "axios";
const Friends = ({crntUser,isLoggedIn}) => {
    // let {crntUser,isLoggedIn} = React.useContext(obj);
    const [msg,setMsg] = React.useState('');
    const [friends,SetFriends] = React.useState([]);
    let val = {userId:crntUser.id};
    let data = JSON.stringify(val);
    const loadFriends = () => {
        Axios.post("http://localhost/projects/ChatApp/API/getFriends.php",data)
        .then((response) => {
            if(response.data.flg == 1)
            {
                SetFriends(response.data.friends);
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
            setMsg('Internal Server Error');
            setTimeout(function(){
                setMsg('');
            },2500);
        })
    }
    React.useEffect(() => {
        loadFriends();
    },[])
    if(isLoggedIn)
    {
        if(friends.length > 0)
        {
            return(
                <div>
                    {msg && <h4>{msg}</h4>}
                    {
                        friends.map((friend) => {
                            return <Friend key = {friend.user_id} {...friend}/>
                        })
                    }
                </div>
            )
        }
        else
        {
            return (
                <div>
                    <h4>No Friends Yet ...</h4>
                </div>
            )
        }
    }
    else
    {
        return (
            <div>
                <h4>Please Log in to View Friends</h4>
            </div>
        )
    }
}
export default Friends;