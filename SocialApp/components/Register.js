import React from "react";
import {Link,useHistory} from "react-router-dom";
const Register = () => {
    const history = useHistory();
    const [user,setUser] = React.useState({
        username:'',
        password:'',
        image:'',
        description:''
    });
    const [msg,setMsg] = React.useState('');
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://192.168.0.6:5000/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data.flg === 1)
            {
                setMsg('Registration Successfull');
                setTimeout(function(){
                    setMsg('');
                },2500)
                setUser({
                    username:'',
                    password:'',
                    description:'',
                    image:''
                })
                setTimeout(function(){
                    setMsg('');
                },2500)
                setTimeout(function(){
                    history.push('/');
                },3500)
            }
            else if(data.flg === 2)
            {
                setMsg('Username Already exists. Pleae Use a different Username');
                setTimeout(function(){
                    setMsg('');
                },2500)
                setUser({
                    ...user,
                    username:''
                })
            }
            else
            {
                setMsg('Internal Server Error. Please try again');
                setTimeout(function(){
                    setMsg('');
                },2500)
            }
        })
        .catch((err) => {
            setMsg('No Response from the Server');
            setTimeout(function(){
                setMsg('');
            },2500)
        })
    }
    return(
        <div>
            {msg && <h4>{msg}</h4>}
            <div>
                <form onSubmit = {handleSubmit}>
                    <input
                        type = 'text'
                        placeholder = 'username'
                        autoComplete = 'off'
                        value = {user.username}
                        name = 'username'
                        onChange = {handleChange}
                    />
                    <input
                        type = 'password'
                        placeholder = 'password'
                        autoComplete = 'off'
                        value = {user.password}
                        name = 'password'
                        onChange = {handleChange}
                    />
                    <input
                        type = 'text'
                        placeholder = 'Image Url'
                        autoComplete = 'off'
                        value = {user.image}
                        name = 'image'
                        onChange = {handleChange}
                    />
                    <textarea
                        value = {user.description}
                        onChange = {handleChange}
                        name = 'description'
                    >

                    </textarea>
                    <button type = 'submit'>Register</button>
                    <h4>Already have an Account then <Link to = '/login'>Log In</Link></h4>
                </form>
            </div>
            <div>
                <h3>SocialApp</h3>
            </div>
        </div>
    )
}
export default Register;