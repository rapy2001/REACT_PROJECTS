import React from "react";
import Axios from "axios";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
const Register = () => {
    let history = useHistory();
    const [user,setUser] = React.useState({
        username:'',
        password:'',
        image:''
    });
    const [msg,setMsg] = React.useState('');
    const handleChange = (e) => {
        let newUser = {
            ...user,
            [e.target.name]:e.target.value
        }
        setUser(newUser);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(user.username == '' || user.password == '' || user.image == '')
        {
            setMsg('All fields are Mandatory');
            setTimeout(function(){
                setMsg('');
            },2500);
        }
        else
        {
            let data = JSON.stringify(user); // for PHP + MYSQL BACKEND
            let alternateData = user; // for NODE JS + MYSQL BACKEND
            let link1 = 'http://localhost/projects/ChatApp/API/addUser.php';
            let link2 = 'http://192.168.0.6:5000/register';
            Axios.post(link2,alternateData) // chnage second arg depending on the backend used
            .then((response) => {
                if(response.data.flg == 1)
                {
                    setMsg('Registration Successfull');
                    setTimeout(function(){
                        setMsg('');
                    },2500);
                    setTimeout(function(){
                        history.push('/login');
                    },3500);
                    setUser({
                        username:'',
                        password:'',
                        image:''
                    })
                }
                else if(response.data.flg == 2)
                {
                    setMsg('The Username already exists Please try a different Username');
                    setTimeout(function(){
                        setMsg('');
                    },2500);
                    setUser({
                        ...user,
                        username:''
                    })
                }
                else
                {
                    setMsg('Internal Server Error, Please try again later');
                    setTimeout(function(){
                        setMsg('');
                    },2500);
                }
            })
            .catch((err) => {
                setMsg("No Response from server");
                setTimeout(function() {
                    setMsg('');
                }, 2500);
            })
        }
    }
    return (
        <div className = 'register box'>
            {msg && <h4 className = 'msg'>{msg}</h4>}
            <div className = 'box_1'>
                <form onSubmit = {handleSubmit} className = 'form'>
                    <h3>Register</h3>
                    <input 
                        type = 'text' 
                        name = 'username' 
                        placeholder = 'Your Username' 
                        value = {user.username} 
                        required = 'required' 
                        onChange = {handleChange} 
                        autoComplete = 'off'
                    />
                    <input 
                        type = 'password' 
                        name = 'password' 
                        placeholder = 'Your Password' 
                        value = {user.password} 
                        required = 'required' 
                        onChange = {handleChange} 
                        autoComplete = 'off'
                    />
                    <input 
                        type = 'text' 
                        name = 'image' 
                        placeholder = 'Image Url' 
                        value = {user.image} 
                        onChange = {handleChange} 
                        required = 'required' 
                        autoComplete = 'off'
                    />
                    <button className = 'btn' type = 'submit'>Register</button>
                    <h4>Already have an Account ? Then <Link to = '/login'>Log In</Link></h4>
                </form>
            </div>
            <div className = 'box_2'>
                <h3>Chat App</h3>
            </div>
        </div>
    )
}
export default Register;