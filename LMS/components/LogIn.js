import React from "react";
import Axios from "axios";
import {useHistory} from "react-router-dom";
const Login = (props) => {
    let history = useHistory();
    let [user,setUser] = React.useState({
        username:'',
        password:'',
        type:1
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(user);
        if(user.username === '' || user.password === '')
        {
            props.showMessage('All fields are necessary');
        }
        else
        {
            Axios.post('http://localhost:5000/login',user)
            .then((response) => {
                if(response.data.flg === 1)
                {
                    props.showMessage('Log In Successfull');
                    setUser({
                        username:'',
                        password:'',
                        type:-1
                    })
                    props.login(user);
                    setTimeout(() => {
                        history.push('/');
                    },2500)
                }
                else if(response.data.flg === 2)
                {
                    props.showMessage('User account does not exists. Please Register');
                    setUser({
                        username:'',
                        password:'',
                        type:-1
                    })
                }
                else if(response.data.flg === 3)
                {
                    props.showMessage('Password is Wrong');
                    setUser({
                        ...user,
                        password:''
                    })
                }
                else
                {
                    props.showMessage('Internal Server Error');
                }
            })
            .catch((err) => {
                props.showMessage('No response from server');
            })
        }
    }
    return (
        <div className = 'box login'>
            <div className = 'box_1'>
                <form className = 'form' onSubmit = {handleSubmit}>
                    <h3>Log In</h3>
                    <input
                        type = 'text'
                        name = 'username'
                        value = {user.username}
                        onChange = {handleChange}
                        placeholder = 'Your Username'
                        autoComplete = 'off' 
                    />
                    <input
                        type = 'password'
                        name = 'password'
                        value = {user.password}
                        onChange = {handleChange}
                        placeholder = 'Your Password'
                        autoComplete = 'off' 
                    />
                    <div className = 'selection'>
                        <label>
                            Account Type:
                        </label>
                        <select 
                            name = 'type' 
                            value = {user.type} 
                            onChange = {handleChange}
                        >
                            <option value = '1'>Admin</option>
                            <option value = '2'>Member</option>
                        </select>
                    </div>
                    
                    <button className = 'btn' type = 'submit'>Log In</button>
                </form>
            </div>
            <div className = 'box_2'>
                <h3>LMS</h3>
            </div>
        </div>
    )
}
export default Login;