import React from "react";
// import {obj} from "../App";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import Axios from "axios";
const LogIn = ({login}) => {
    let history =useHistory();
    const [user,setUser] = React.useState({
        username:'',
        password:''
    });
    const [msg,setMsg] = React.useState('');
    const handleChange  = (e) => {
        let newUser = {
            ...user,
            [e.target.name]:e.target.value
        }
        setUser(newUser);
    }
    // let {login} = React.useContext(obj);
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = JSON.stringify(user);
        Axios.post("http://localhost/projects/ChatApp/API/login.php",data)
        .then((response) => {
            if(response.data.flg == 1)
            {
                setMsg('Login Successfull');
                login({
                    username:response.data.user.username,
                    id:response.data.user.user_id
                })
                setTimeout(function(){
                    setMsg('');
                },2500);
                setTimeout(function(){
                    history.push('/');
                },3500);
                setUser({
                    username:'',
                    password:''
                })
            }
            else if(response.data.flg == 2)
            {
                setMsg('Username does not exists. Please register');
                setTimeout(function(){
                    setMsg('');
                },2500);
                setTimeout(function(){
                    history.push('/register');
                },3500);
            }
            else if(response.data.flg == 3)
            {
                setMsg('Password is Wrong');
                setTimeout(function(){
                    setMsg('');
                },2500);
                setUser({
                    ...user,
                    password:''
                })
            }
        })
        .catch((err) => {
            setMsg('No Response from Server');
            setTimeout(function(){
                setMsg('');
            },2500);
        })
    }
    return (
        <div className = 'login box'>
            {msg && <h4 className = 'msg'>{msg}</h4>}
            <div className = 'box_1'>
                <form className = 'form' onSubmit = {handleSubmit}>
                    <h3>Log In</h3>
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
                    <button className = 'btn 'type = 'submit'>Log In</button>
                    <h4>Don't have an Account ? Then <Link to = '/register'>Register</Link></h4>
                </form>
            </div>
            <div className = 'box_2'>
                <h3>Chat App</h3>
            </div>
        </div>
    )
}
export default LogIn;