import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Homepage from "./components/Homepage";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Register from "./components/Register";
import LogIn from "./components/LogIn";
import Users from "./components/Users";
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
    // console.log(crntUser);
    return (
        <obj.Provider value = {{crntUser,login,logout,isLoggedIn}}>
             <Router>
                <Nav />
                <Switch>
                    <Route exact path = '/'>
                        <Homepage />
                    </Route>
                    <Route path = '/register' exact>
                        <Register />
                    </Route>
                    <Route exact path = '/login'>
                        <LogIn />
                    </Route>
                    <Route exact path = '/viewUsers'>
                        <Users />
                    </Route>
                    <Route exact path = '*'>
                        <ErrorPage />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </obj.Provider>
    )
}
export default App;