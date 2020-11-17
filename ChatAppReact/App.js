import React from "react";
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
export const obj = React.createContext();
const App = () => {
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
        setCrntUser({
            username:'',
            id:0
        })
        setIsLoggedIn(false);
    }
    console.log(crntUser);
    return (
        // <obj.Provider value = {{crntUser,login,logout,isLoggedIn}}>
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
        // </obj.Provider>
    )
}
export default App;