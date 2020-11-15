import React from "react";
import Axios from "axios";
import {obj} from "../App"; 
import User from "./User";
const Users = () => {
    const [msg,setMsg] = React.useState('');
    const [users,setUsers] = React.useState([]);
    const {crntUser,isLoggedIn} = React.useContext(obj);
    let object = {id:crntUser.id};
    let data = JSON.stringify(object);
    React.useEffect(() => {
        if(isLoggedIn)
        {
            Axios.post("http://localhost/projects/ChatApp/API/getUsers.php",data)
            .then((response) => {
                if(response.data.flg == 1)
                {
                    setUsers(response.data.users);
                }   
                else
                {
                    setMsg("Internal Server Error");
                    setTimeout(function(){
                        setMsg('');
                    },2500);
                }
            })
            .catch((err) => {
                setMsg("No Response from the Server");
                setTimeout(function(){
                    setMsg('');
                },2500);
            })
        }
    },[]);
    if(isLoggedIn)
    {
        let ary = users.map((user) => {
            return <User key = {user.user_id} {...user}/>
        })
        return (
            <div>
                {ary.length > 0 ? ary : <h4>No Users Yet</h4>}
            </div>
        )
    }
    else
    {   
        return (
            <div>
                <h4>Please Log In to View The Users</h4>
            </div>
        )
    }
    
}
export default Users;