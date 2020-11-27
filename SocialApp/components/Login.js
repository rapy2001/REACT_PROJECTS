import React from "react";
import {useHistory, Link} from "react-router-dom";
const Login = ({login}) => {
    let history = useHistory();
    const [user,setUser] = React.useState({
        username:'',
        password:''
    });
    const [msg,setMsg] = React.useState('');
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://192.168.0.6:5000/login',{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body:JSON.stringify(user)
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.flg === 1)
            {
                login(data.user);
                setMsg('Log In Successfull');
                setTimeout(function() {
                    setMsg('');
                },2500)
                setUser({
                    username:'',
                    password:''
                })
                setTimeout(function(){
                    history.push('/');
                },3500);
            }
            else if(data.flg === 2)
            {
                setMsg('Username does not exist. Please Register');
                setTimeout(function() {
                    setMsg('');
                },2500)
                setUser({
                    username:'',
                    password:''
                })
                setTimeout(function(){
                    history.push('/register');
                },3500);
            }
            else if(data.flg === 3)
            {
                setMsg('Password is Wrong');
                setTimeout(function() {
                    setMsg('');
                },2500)
                setUser({
                    ...user,
                    password:''
                })
                
            }
            else
            {
                setMsg('Internal Server Error');
                setTimeout(function() {
                    setMsg('');
                },2500)
            }
        })
        .catch((err) => {
            setMsg('No Response from the Server');
            setTimeout(function() {
                setMsg('');
            },2500)  
        })
    }

    return(
        <div className = 'login box'>
            {msg && <h4 className = 'msg'>{msg}</h4>}
            <div className = 'box_1'>
                <form className = 'form' onSubmit = {handleSubmit}>
                    <h3>Log In</h3>
                    <input
                        type = 'text'
                        placeholder = 'Your Username'
                        name = 'username'
                        value = {user.username}
                        autoComplete = 'off' 
                        onChange = {handleChange}
                    />
                     <input
                        type = 'password'
                        placeholder = 'Your Password'
                        name = 'password'
                        value = {user.password}
                        autoComplete = 'off' 
                        onChange = {handleChange}
                    />
                    <button className = 'btn' type = 'submit'> 
                        Log In
                    </button>
                    <h4>Don't have an account ? Then <Link to = '/register'>Register</Link></h4>
                </form>
            </div>
            <div className = 'box_2'>
                <h3>Social App</h3>
            </div>
        </div>
    )
}
export default Login;