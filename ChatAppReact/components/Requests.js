import React from "react";
import Axios from "axios";
import {obj} from "../App"; 
const Requests = () => {
    const [requests,setRequests] = React.useState([]);
    const [msg,setMsg] = React.useState('');
    let {id} = React.useContext(obj);
    let obj = {id};
    let data = JSON.stringify(obj);
    React.useEffect(() => {
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
    },[])
    const Request = () => {
        return (
            <div>

            </div>
        )
    }
    return (
        <div>
            {
                requests.map((request) => {
                    return (<Request/>);
                })
            }
        </div>
    )
}
export default Requests;