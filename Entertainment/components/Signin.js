import React from 'react';
import {Link,useHistory} from 'react-router-dom';
import Axios from 'axios';
const Signin = (props) => {
    let history = useHistory();
    const [user,setUser] = React.useState({
        username:'Username',
        password:'Password'
    })
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(user.username === '' || user.password === '')
        {
            props.showMessage('The Username and Password can\'t be empty',0);
        }
        else
        {
            Axios.post('http://192.168.0.6:5000/login',{username:user.username,password:user.password})
            .then((response) => {
                console.log(response.data);
                if(response.data.flg == 1)
                {
                    
                    setUser({
                        username:'',
                        password:''
                    })
                    props.logIn(response.data.user);
                    setTimeout(() => {
                        history.push('/account');
                    },500)
                }
                else if(response.data.flg == 2)
                {
                    props.showMessage('The Username does not exists. Please Register',0);
                    setTimeout(() => {
                        history.push('./signup');
                    },5500)
                }
                else if(response.data.flg == 3)
                {
                    props.showMessage('The Password is Wrong',0);
                }
                else
                {
                    props.showMessage('Internal Server Error. Please try again later');
                }
            })
            .catch((err) => {
                props.showMessage(`No Response from the Server. Err: ${err}`)
            })
        }
    }
    return (
        <div className = 'login'>

            <div className = 'loginBox_1'>
                <div className = 'header'>
                   <Link className = 'logo' to = '/'>Entertainment</Link>
                   <Link className = 'link' to = '/signup'>
                       Sign In
                   </Link>
               </div>
               <div className = 'loginFormBox'>
                   <form className = 'form' onSubmit = {handleSubmit}>
                        <h3>Sign In</h3>
                        <input
                            type = 'text'
                            placeholder = 'Username'
                            autoComplete = 'off'
                            value = {user.username}
                            onChange = {handleChange} 
                            name = 'username'
                        />
                        <input
                            type = 'password'
                            placeholder = 'Password'
                            autoComplete = 'off'
                            value = {user.password}
                            onChange = {handleChange} 
                            name = 'password'
                        />
                        <button className = 'btn' type = 'submit'>
                            Sign In
                        </button>
                        <h4>New to Entertainment ? <Link className = 'address' to = '/signup'>Signup  Now</Link></h4>
                   </form>
               </div>
            </div>
            <div class="part_8">
                <div class="part_8_box_2">
                    <div class="part_8_box_2_box_1">
                        <div>
                            <h2>SHOP</h2>
                            <h3>Always Pan</h3>
                            <h3>Main Plates</h3>
                            <h3>Side Bowls</h3>
                            <h3>Drinking Glasses</h3>
                            <h3>Dinner for 4</h3>
                        </div>
                        <div>
                            <h2>COMPANY</h2>
                            <h3>Mission</h3>
                            <h3>FAQs</h3>
                        </div>
                        <div>
                            <h2>SOCIAL</h2>
                            <h3>Instagram</h3>
                            <h3>twitter</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className = 'footer'>
                <h4>2020. Rajarshi Saha</h4>
            </div>
        </div>
    )
}
export default Signin;