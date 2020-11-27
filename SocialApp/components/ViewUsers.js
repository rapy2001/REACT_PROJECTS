import React from "react";
import User from "./User";
const ViewUsers = ({crntUser,isLoggedIn}) => {
    const [users,setUsers] = React.useState([]);
    const [msg,setMsg] = React.useState('');
    let interval  = null;
    const getUsers = () => {
        fetch(`http://192.168.0.6:5000/getUsers/${crntUser.userId}`,{
            method:'GET'
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data.flg === 1)
            {
                setUsers(data.users);
            }
            else
            {
                setMsg('Could not Load the Users');
                setTimeout(function(){
                    setMsg('');
                },2500)
            }
        })
        .catch((err) => {
            setMsg('No Response from Server');
            setTimeout(function(){
                setMsg('');
            },2500)    
        })
    }
    React.useEffect(() => {
        interval = setInterval(function(){
            getUsers();
        },1000)
        return () => {
            clearInterval(interval);
        }
    },[])
    if(isLoggedIn)
    {
        if(users.length > 0)
        {
            let userItems = users.map((user) => {
                if(user.user_id !== crntUser.userId)
                    return (
                        <User key = {user.user_id} {...user} crntUser = {crntUser}/>
                    )
            })
            return (
                <div>
                    {userItems}
                </div>
            )
        }
        else
        {
            return (
                <div>
                    <h4>No Users Yet ...</h4>
                </div>
            )
        }
    }
    else
    {
        return (
            <div>
                <h4>Please Log In to View Users</h4>
            </div>
        )
    }
}
export default ViewUsers;