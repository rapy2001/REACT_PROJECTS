import React from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';
const Signup = (props) => {
    const history = useHistory();
    const [user,setUser] = React.useState({
        username:'Username',
        password:'Password',
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
            Axios.post('http://192.168.0.5:5000/addUser',{username:user.username,password:user.password})
            .then((response) => {
                if(response.data.flg == 1)
                {
                    console.log(response);
                    props.showMessage('You have Successfully Registered',1);
                    setUser({
                        username:'',
                        password:''
                    })
                    setTimeout(() => {
                        history.push('/signin');
                    },5500)
                }
                else if(response.data.flg == 2)
                {
                    props.showMessage('The Username already exists. Please use a different username',0);
                }
                else
                {
                    props.showMessage('Interal Server Error. Please try again later',0);
                }
            })
            .catch(err => {
                props.showMessage(`No Response from the Server : ${err}`,0);
            })
            // fetch('http://localhost:5000/addUser',{
            //     method:'POST',
            //     body:JSON.stringify({x:10})
            // })
            // .then((response) => response.json())
            // .then((data) => {
            //     console.log(data);
            //     if(data.flg == 1)
            //     {
            //         props.showMessage('You have Successfully Registered',1);
            //         setUser({
            //             username:'',
            //             password:''
            //         })
            //     }
            //     else
            //     {
            //         props.showMessage('Interal Server Error. Please try again later',0);
            //     }
            // })
            // .catch((err) => {
            //     props.showMessage(`No Response from the Server : ${err}`,0);
            // })
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
                        <h3>Sign Up</h3>
                        <input
                            type = 'text'
                            placeholder = 'Username'
                            autoComplete = 'off'
                            name = 'username'
                            value = {user.username}
                            onChange = {handleChange} 
                        />
                        <input
                            type = 'password'
                            placeholder = 'Password'
                            autoComplete = 'off'
                            value = {user.password}
                            onChange = {handleChange}
                            name = 'password'
                        />
                        <button className = 'btn'>
                            Sign Up
                        </button>
                        <h4>Already a User ? Then <Link className = 'address' to = '/signin'>Signin Now</Link></h4>
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
export default Signup;