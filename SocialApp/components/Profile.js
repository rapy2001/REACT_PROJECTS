import React from "react";

const Profile = ({crntUser}) => {
    // const [user,setUser] = React.useState({});
    // const[msg,setMsg] = React.useState('');
    return(
        <div className = 'profile'>
            <div className = 'profile_box_1'>
                <div className = 'profile_image_box'>
                    <img src = {crntUser.image} alt = {crntUser.username}/>
                    <button className = 'editImage'><i className = 'fa fa-pencil'></i></button>
                </div>
                <h3>{crntUser.username}</h3>
            </div>
            <div className = 'profile_box_2'>
                <p>
                    {crntUser.description}
                </p>
            </div>
        </div>
    )
}
export default Profile;