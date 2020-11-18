import React from "react";
import Axios from "axios";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Homepage from "./components/Homepage";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Register from "./components/Register";
import LogIn from "./components/LogIn";
import Users from "./components/Users";
import Requests from "./components/Requests";
import Friends from "./components/Friends";
import Texts from "./components/Texts";
import ErrorPage from "./components/ErrorPage";
import "./public/style.css";
export const obj = React.createContext();
const App = () => {
    const [msg,setMsg] = React.useState('');
    const [crntUser,setCrntUser] = React.useState({
        username:'',
        id:0
    });
    const [isLoggedIn,setIsLoggedIn] = React.useState(false);
    const login = (user) => {
        setCrntUser(user);
        setIsLoggedIn(true);
    }
    const logout = () => {
        let data = JSON.stringify({userId:crntUser.id});
        Axios.post("http://localhost/projects/ChatApp/API/logout.php",data)
        .then((response) => {
            if(response.data.flg == 1)
            {
                console.log("hello");
                setCrntUser({
                    username:'',
                    id:0
                })
                setIsLoggedIn(false);
            }
            else
            {
                setMsg('Error While Logging Out');
                setTimeout(function(){
                    setMsg('');
                },2500);
            }
        })
        .catch((err) => {
            setMsg('Server Error while Logging Out');
            setTimeout(function(){
                setMsg('');
            },2500);
        })
        
    }
    // console.log(crntUser);
    return (
        // <obj.Provider value = {{crntUser,login,logout,isLoggedIn}}>
            <div>
                {msg && <h4>{msg}</h4>}
                 <Router>
                    <Nav crntUser = {crntUser} isLoggedIn = {isLoggedIn} login = {login} logout = {logout}/>
                    <Switch>
                        {/* <obj.Provider value = {{crntUser,login,logout,isLoggedIn}}> */}
                            <Route exact path = '/'>
                                <Homepage crntUser = {crntUser} isLoggedIn = {isLoggedIn} login = {login} logout = {logout}/>
                            </Route>
                            <Route path = '/register' exact>
                                <Register crntUser = {crntUser} isLoggedIn = {isLoggedIn} login = {login} logout = {logout}/>
                            </Route>
                            <Route exact path = '/login'>
                                <LogIn crntUser = {crntUser} isLoggedIn = {isLoggedIn} login = {login} logout = {logout}/>
                            </Route>
                            <Route exact path = '/viewUsers'>
                                <Users crntUser = {crntUser} isLoggedIn = {isLoggedIn} login = {login} logout = {logout}/>
                            </Route>
                            <Route exact path = '/friendRequests'>
                                <Requests crntUser = {crntUser} isLoggedIn = {isLoggedIn} login = {login} logout = {logout}/>
                            </Route>
                            <Route exact path = '/friends'>
                                <Friends crntUser = {crntUser} isLoggedIn = {isLoggedIn} login = {login} logout = {logout}/>
                            </Route>
                            <Route exact path = '/:friendId/chat' children = {<Texts isLoggedIn = {isLoggedIn} crntUser = {crntUser}/>}>
                                
                            </Route>
                        {/* </obj.Provider> */}
                        <Route exact path = '*'>
                            <ErrorPage />
                        </Route>
                    </Switch>
                    <Footer />
                </Router>
            </div>
            
        // </obj.Provider>
    )
}
export default App;