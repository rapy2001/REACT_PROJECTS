import React from "react";

const Request = ({request,crntUser}) => {
    const [msg,setMsg] = React.useState('');
    const accept = () => {
        fetch('http://192.168.0.6:5000/acceptFriendRequest',{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body:JSON.stringify({userId:crntUser.userId,friendId:request.user_id})
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.flg === 1)
            {
                setMsg('Request Accepted');
                setTimeout(function(){
                    setMsg('');
                },2500)
            }
            else
            {
                setMsg('Server Error');
                setTimeout(function(){
                    setMsg('');
                },2500)
            }
        })
        .catch((err) => {
            setMsg('Internal Server Error' + err.message);
            setTimeout(function(){
                setMsg('');
            },2500)   
        })
    }

    const reject = () => {
        fetch('http://192.168.0.6:5000/rejectFriendRequest',{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body:JSON.stringify({userId:crntUser.userId,friendId:request.user_id})
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.flg === 1)
            {
                setMsg('Request deleted');
                setTimeout(function(){
                    setMsg('');
                },2500)
            }
            else
            {
                setMsg('Server Error');
                setTimeout(function(){
                    setMsg('');
                },2500)
            }
        })
        .catch((err) => {
            setMsg('Internal Server Error' + err.message);
            setTimeout(function(){
                setMsg('');
            },2500)   
        })
    }

    return (
        <div className = 'user'>
            {msg && <h4>{msg}</h4>}
            <div className = 'user_box_1'>
                <img src = {request.image} alt = {request.username}/>
            </div>
            <div className = 'user_box_2'>
                <h4>{request.username}</h4>
                <div>
                    <button id = 'accept'onClick = {accept}><i className = 'fa fa-plus'></i></button>
                    <button id = 'reject'onClick = {reject}><i className = 'fa fa-times'></i></button>
                </div>
            </div>
        </div>
    )
}
export default Request;