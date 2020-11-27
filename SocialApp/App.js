import React from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import './public/style.css';
import Homepage from "./components/Homepage";
import Nav from "./components/Nav";
import Register from "./components/Register";
import Login from "./components/Login";
import ViewUsers from "./components/ViewUsers";
import ViewFriendRequest from "./components/ViewFriendRequest";
import AddPost from "./components/AddPost";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Footer from "./components/Footer";
const App = () => {
    const [isLoggedIn,setIsLoggedIn] = React.useState(false);
    const [showPostForm,setShowPostForm] = React.useState(false);
    const [crntUser,setCrntUser] = React.useState({
        userId:-1,
        username:'',
        image:''
    });
    const toggleForm = (flg) => {
        if(flg === 1)
            setShowPostForm(true);
        else    
            setShowPostForm(false);
    }
    const login = (user) => {
        setCrntUser({
            userId:user.user_id,
            username:user.username,
            image:user.image
        })
        setIsLoggedIn(true);
    }
    const logout = () => {
        setCrntUser({
            userId:-1,
            username:'',
            image:'',
            description:''
        })
        setIsLoggedIn(false);
    }
   
    return (
        <div>
            <Router>
                <Nav crntUser = {crntUser} isLoggedIn = {isLoggedIn} login = {login} logout = {logout} toggleForm = {toggleForm}/>
                {isLoggedIn && <Profile crntUser = {crntUser}/>}
                {showPostForm === true && isLoggedIn === true ?  <AddPost crntUser = {crntUser} isLoggedIn = {isLoggedIn} toggleForm = {toggleForm}/> : null}
                <Switch>
                    <Route path = '/' exact>
                        <Homepage />
                    </Route>
                    <Route path= '/register' exact>
                        <Register />
                    </Route>
                    <Route path = '/login' exact>
                        <Login login = {login}/>
                    </Route>
                    <Route path = '/viewUsers' exact >
                        <ViewUsers crntUser = {crntUser} isLoggedIn = {isLoggedIn}/>
                    </Route>
                    <Route path = '/viewFriendRequest' exact>
                        <ViewFriendRequest crntUser = {crntUser} isLoggedIn = {isLoggedIn}/>
                    </Route>
                    <Route path = '/viewFeed' exact>
                        <Feed crntUser = {crntUser} isLoggedIn = {isLoggedIn}/>
                    </Route>
                </Switch>
            </Router>
            <Footer />
        </div>
    )
}
export default App;