import React from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Homepage from "./components/Homepage";
import Nav from "./components/Nav";
import Register from "./components/Register";
const App = () => {
    const [isLoggedIn,setIsLoggedIn] = React.useState(false);
    const [crntUser,setCrntUser] = React.useState({
        userId:-1,
        username:'',
        image:''
    });
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
            image:''
        })
        setIsLoggedIn(false);
    }
    return (
        <Router>
            <Nav crntUser = {crntUser} isLoggedIn = {isLoggedIn} login = {login} logout = {logout}/>
            <Switch>
                <Route path = '/' exact>
                    <Homepage />
                </Route>
                <Route to = '/register'>
                    <Register />
                </Route>
            </Switch>
        </Router>
    )
}
export default App;