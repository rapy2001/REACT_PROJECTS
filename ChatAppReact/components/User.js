import React from "react";
import Axios from 'axios';
import {obj} from "../App";
import {useHistory} from "react-router-dom";
const User = ({username,image,user_id,status,getUsersFunction}) => {
    let history = useHistory();
    let {crntUser} = React.useContext(obj);
    const [msg,setMsg] = React.useState('');
    const request = (user_id) => {
        let userId = crntUser.id;
        let friend_id = user_id;
        let obj = {userId:userId,friendId:friend_id};
        let data = JSON.stringify(obj);
        console.log(data);
        Axios.post("http://localhost/projects/ChatApp/API/sendFriendRequest.php",data)
        .then((response) => {
            if(response.data.flg == 1)
            {
                setMsg('Friend Request Send Successfully');
                getUsersFunction();
                setTimeout(function(){
                    setMsg('');
                },2500);
                setTimeout(function(){
                    history.push('/');
                },3500);
            }
        })  
        .catch((err) => {
            setMsg('Error while sending the Friend Request');
            console.log(err);
            setTimeout(function(){
                setMsg('');
            },2500);
        })    
    }
    return (
        <div>
            {msg && <h4>{msg}</h4>}
            <div>
                <img src = {image} alt = {username}/>
            </div>
            <div>
                <h4>{username}</h4>
                {status == 1 ? null : <button type = 'button' onClick = {() => {request(user_id)}}>Send Friend Request</button>}
            </div>
        </div>
    )
}
export default User;