import React from "react";
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import './public/style.css';
import Homepage from './components/Homepage';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Account from './components/Account';
import AddItem from './components/AddItem';
import Movies from './components/Movies';
const App = () => {
    const [isLoggedIn,setIsLoggedIn] = React.useState(false);
    const [message,setMessage] = React.useState({
        text:'',
        show:false,
        type:-1
    })
    const [crntUser, setCrntUser] = React.useState({
        username:'',
        userId:-1,
        accountId:-1
    })
    const showMessage = (text,type) => {
        setMessage({
            ...message,
            text:text,
            type:type,
            show:true
        })
        setTimeout(() => {
            setMessage({
                text:'',
                show:false,
                type:-1
            })
        },5000)
    }
    const logIn = (user) => {
        setCrntUser({
            username:user.username,
            userId:user.userId
        })
        setIsLoggedIn(true);
    }
    const updateAccount = (account) => {
        setCrntUser({
            ...crntUser,
            accountId:account
        })
    }
    const logOut = () => {
        setCrntUser({
            username:'',
            userId:-1
        })
        setIsLoggedIn(false);
    }
    // console.log(crntUser);
    return (
        <Router>
            {message.show == true ?   
            <div className = 'message'>
                <div className = 'messageBox_1'>
                    <h4 onClick = {() => setMessage({...message,show:false,text:'',type:-1})}><i className = 'fa fa-times'></i></h4>
                </div>
                <div className = 'messageBox_2'>
                    <div className ='messageBox_2_box'>
                        <div className= 'messageImageBox'>
                            <img src = {message.type == 1 ? 'https://cdn.dribbble.com/users/472667/screenshots/14651557/media/9f6abf9b528fac0e2befaffc11b836a2.png?compress=1&resize=1000x750' : 'https://cdn.dribbble.com/users/1891752/screenshots/9994057/media/be7704248dcb91e7eeb3f80c452eb680.jpg?compress=1&resize=1000x750'} />
                        </div>
                        <h4>{message.text}</h4>
                    </div>
                    
                </div>
            </div> : null}
            <Switch>
                <Route path = '/' exact>
                    <Homepage crntUser = {crntUser} isLoggedIn = {isLoggedIn}/>
                </Route>
                <Route path = '/signin' exact>
                    <Signin showMessage = {showMessage} logIn = {logIn} Account = {Account}/>
                </Route>
                <Route path = '/signup'>
                    <Signup showMessage = {showMessage}/>
                </Route>
                <Route path = '/account' exact>
                    {isLoggedIn === true ?  <Account showMessage = {showMessage} updateAccount = {updateAccount} userId = {crntUser.userId} /> : <div><h4>Please Log in to Access this Page</h4></div>}
                </Route>
                <Route path = '/addItem' exact>
                    {isLoggedIn ? crntUser.username === 'Admin' ? <AddItem showMessage = {showMessage} username = {crntUser.username} /> : null : null}
                </Route>
                <Route path = '/movies' exact>
                    {isLoggedIn ? <Movies showMessage = {showMessage} /> : null}
                </Route>
            </Switch>
        </Router>
    )
}
export default App;