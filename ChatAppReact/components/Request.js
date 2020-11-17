import React from "react";
import Axios from "axios";
// import {obj} from "../App";
const Request = ({user_id,username,image,loadRequests,crntUser}) => {
    // let {crntUser} = React.useContext(obj);
    let val = {userId:crntUser.id,friendId:user_id};
    let data = JSON.stringify(val);
    const [msg,setMsg] = React.useState('');
    const acceptRequest = () => {
        Axios.post('http://localhost/projects/ChatApp/API/acceptFriendRequest.php',data)
        .then((response) => {
            if(response.data.flg == 1)
            {
                setMsg('Request Accespted');
                setTimeout(function(){
                    setMsg('');
                },2500);
                setTimeout(function(){
                    loadRequests();
                },3500);
            }
            else
            {
                setMsg('Internal Server Error');
                setTimeout(function(){
                    setMsg('');
                },2500);
            }
        })
        .catch((err) => {
            setMsg('Error while accepting the friend Request');
            setTimeout(function(){
                setMsg('');
            },2500);
        })
    }

    const declineRequest = () => {
        Axios.post("http://localhost/projects/ChatApp/API/deleteRequest.php",data)
        .then((response) => {
            if(response.data.flg === 1)
            {
                setMsg('Request declined');
                setTimeout(function(){
                    setMsg('');
                },2500);
                setTimeout(function(){
                    loadRequests();
                },3500);
            }
            else
            {
                setMsg('Internal Server Error');
                setTimeout(function(){
                    setMsg('');
                },2500);
            }
        })
        .catch((err) => {
            setMsg('Error while declining the friend Request');
            setTimeout(function(){
                setMsg('');
            },2500);
        })
    }
    return (
        <div>
            {msg && <h4>{msg}</h4>}
            <div>
                <img src ={image} alt = {username}/>
            </div>
            <div>
                <h3>{username}</h3>
                <button type = 'button' onClick = {acceptRequest}>Accept Request</button>
                <button type = 'button' onClick = {declineRequest}>Decline</button>
            </div>
        </div>
    )
}
export default Request;