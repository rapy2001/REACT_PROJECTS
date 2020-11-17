import React from "react";
import Axios from "axios";
// import {obj} from "../App"; 
import Request from "./Request";
const Requests = ({crntUser,isLoggedIn}) => {
    const [requests,setRequests] = React.useState([]);
    const [msg,setMsg] = React.useState('');
    // let {crntUser,isLoggedIn} = React.useContext(obj);
    let val = {id:crntUser.id};
    let data = JSON.stringify(val);
    const loadRequests = () => {
        Axios.post("http://localhost/projects/ChatApp/API/getFriendRequests.php",data)
        .then((response) => {
            if(response.data.flg == 1)
            {
                setRequests(response.data.requests);
            } 
        })
        .catch((err) => {
            setMsg('Error');
            setTimeout(function(){
                setMsg('');
            },2500);
        })
    }
    React.useEffect(() => {
        loadRequests();
    },[])
    if(isLoggedIn)
    {
        if(requests.length > 0)
        {
            return (
                <div>
                    {
                        requests.map((request,index) => {
                            return (<Request key = {index} {...request} loadRequests = {loadRequests}/>);
                        })
                    }
                </div>
            )
        }
        else
        {
            return (
                <div>
                    <h4>No Friend Requests Yet</h4>
                </div>
            )
        }
       
    }
    else
    {
        return (
            <div>
                <h4>Please Log In to View Friend Requests</h4>
            </div>
        )
    }
}
export default Requests;