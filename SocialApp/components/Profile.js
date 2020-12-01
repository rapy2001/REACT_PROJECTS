import React from "react";
import Axios from "axios";
const ImageForm = ({crntUser,toggleForm}) => {
    const [user,setUser] = React.useState({
        userId:crntUser.userId,
        image:null
    });
    const [msg,setMsg] = React.useState('');
    const handleChange = (e) => {
        // console.log(e.target.files);
        setUser({
            ...user,
            image:e.target.files[0]
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        let data = new FormData();
        data.append('image',user.image);
        data.append('userId',crntUser.userId);
        // console.log(data);
        Axios.post('http://192.168.0.6:5000/editImage',data)
        .then((response) => {
            console.log(response.data);
            if(response.data.flg === 1)
            {
                toggleForm(0);
            }
            else if(response.data.flg === -1)
            {
                setMsg('Please Upload an Image File');
                setTimeout(function(){
                    setMsg('');
                },2500);
            }
            else if(response.data.flg === -2)
            {
                setMsg('Max Image size allowed is 5 MB');
                setTimeout(function(){
                    setMsg('');
                },2500);
            }
            else if(response.data.flg === -3)
            {
                setMsg('Error while uploading');
                setTimeout(function(){
                    setMsg('');
                },2500);
            }
            else
            {
                setMsg('Internal Server Error');
                setTimeout(function(){
                    setMsg('');
                },2500);
            }
        })
        .catch((err) => {
            setMsg('No response from the Server');
            setTimeout(function(){
                setMsg('');
            },2500);  
        })
    }
    return (
        <div>
            {msg && <h4>{msg}</h4>}
            <div>
                <h4 onClick = {() => toggleForm(0)}><i className = 'fa-fatimes'></i></h4>
            </div>
            <form onSubmit = {handleSubmit}>
                <input onChange = {handleChange} type = 'file' name = 'image'/>
                <button type = 'submit'>Add</button>
            </form>
        </div>
    )
}
const Profile = ({crntUser}) => {
    const [form,setToggleForm] = React.useState((false));
    const toggleForm = (flg) => {
        if(flg === 1)
        {
            setToggleForm(true);
        }
        else
        {
            setToggleForm(false);
        }
    }
    // const[msg,setMsg] = React.useState('');
    return(
        <div className = 'profile'>
            {form && <ImageForm crntUser = {crntUser} toggleForm = {toggleForm}/>}
            <div className = 'profile_box_1'>
                <div className = 'profile_image_box'>
                    <img src = {'./uploads/' + crntUser.image} alt = {crntUser.username}/>
                    <button className = 'editImage' onClick = {() => {toggleForm(1)}}><i className = 'fa fa-pencil'></i></button>
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