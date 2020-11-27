import React from "react";
const User = ({username,image,status,user_id,crntUser}) => {
    const [msg,setMsg] = React.useState('');
    const sendRequest = () => {
        fetch('http://192.168.0.6:5000/sendFriendRequest',{
            headers:{
                'Content-Type':'application/json',
                
            },
            method:'POST',
            body:JSON.stringify({userId:crntUser.userId,friendId:user_id})
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data.flg === 1)
            {
                setMsg('Friend Request Send Successfully');
                setTimeout(function(){
                    setMsg('');
                },2500);
            }
            else
            {
                setMsg('Error while sending the friend Request');
                setTimeout(function(){
                    setMsg('');
                },2500);
            }
        })
        .catch((err) => {
            setMsg('No Response from the Server');
            setTimeout(function(){
                setMsg('');
            },2500);
        })
    }
    return(
        <div>
            {msg && <h4>{msg}</h4>}
            <div>
                <img src = {image} alt = {username}/>
            </div>
            <div>
                <h4>{username}</h4>
                <div>
                    {status === 0 ? <button onClick = {() => sendRequest()}>Send Friend Request</button> : null}
                </div>
            </div>
        </div>
    )
}
export default User;