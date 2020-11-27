import React from "react";

const Profile = ({crntUser}) => {
    const [user,setUser] = React.useState({});
    const[msg,setMsg] = React.useState('');
    return(
        <div>
            <div>
                <div>
                    <img src = {crntUser.image} alt = {crntUser.username}/>
                    <button>Edit</button>
                </div>
                <h3>{crntUser.username}</h3>
            </div>
            <div>
                <p>
                    {crntUser.description}
                </p>
            </div>
        </div>
    )
}
export default Profile;