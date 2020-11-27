import React from "react";
import Request from "./Request";
const ViewFriendRequest = ({crntUser,isLoggedIn}) => {
    const [requests,setRequests] = React.useState([]);
    const [msg,setMsg] = React.useState('');
    let interval = null;
    const getRequests = () =>{ 
        fetch(`http://192.168.0.6:5000/getFriendRequests/${crntUser.userId}`,{
            method:'GET'
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.flg === 1)
            {
                setRequests(data.requests);
            }
            else
            {
                setMsg('Error while getting the Friend Requests');
                setTimeout(function(){
                    setMsg('');
                },2500);
            }
        })
        .catch((err) => {
            setMsg('No Response Server' + err.message);
            setTimeout(function(){
                setMsg('');
            },2500);
        })
    }
    React.useEffect(() => {
        interval = setInterval(function(){
            getRequests()
        },1000)
        return () => {
            clearInterval(interval);
        }
    },[]);
    if(isLoggedIn)
    {
        if(requests.length > 0)
        {
            let requestsItems = requests.map((request) => {
                return (
                    <Request request = {request} key = {request.user_id} crntUser = {crntUser}/>
                )
            })
            return (
                <div>
                    {requestsItems}
                </div>
            )
        }
        else
        {
            return (
                <div>
                    <h4>No Friend Requests Yet..</h4>
                </div>
            )
        }
    }
    else
    {
        return(
            <div>
                <h4>Please Log In to view Friend Request</h4>
            </div>
        )
    }
}
export default ViewFriendRequest;