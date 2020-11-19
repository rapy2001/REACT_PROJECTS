import React from "react";
import Axios from "axios";
// import {obj} from "../App"; 
import User from "./User";
const Users = ({crntUser,isLoggedIn}) => {
    const [msg,setMsg] = React.useState('');
    const [users,setUsers] = React.useState([]);
    // const {crntUser,isLoggedIn} = React.useContext(obj);
    let object = {id:crntUser.id};
    let data = JSON.stringify(object);
    const getUsersFunction = () => {
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
    React.useEffect(() => {
        if(isLoggedIn)
        {
            getUsersFunction();
        }
    },[]);
    if(isLoggedIn)
    {
        let ary = users.map((user) => {
            if(user.user_id !== crntUser.id)
                return <User crntUser = {crntUser} key = {user.user_id} {...user} getUsersFunction = {getUsersFunction}/>
        })
        // console.log(users);
        return (
            <div className = 'users'>
                <div className = 'users_box'>
                    <h1>Our Users</h1>
                    {ary.length > 0 ? ary : <h4>No Users Yet</h4>}
                </div>
                
            </div>
        )
    }
    else
    {   
        return (
            <div className = 'empty'>
                <h4>Please Log In to View The Users</h4>
            </div>
        )
    }
    
}
export default Users;