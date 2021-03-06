import React from "react";
import {Switch,BrowserRouter as Router,Route} from "react-router-dom";
import Homepage from './components/Homepage';
import Nav from "./components/Nav";
import LogIn from "./components/LogIn";
import AddStudent from "./components/AddStudent";
import AddCourse from "./components/AddCourse";
import ViewCourses from "./components/ViewCourses";
import AddBranch from "./components/AddBranch";
import ViewBranches from "./components/ViewBranches";
import AddBook from './components/AddBook';
import ViewBooks from "./components/ViewBooks";
import Footer from "./components/Footer";
import './public/style.css';
const App = () => {
    const [isLoggedIn,setIsLoggedIn] = React.useState(false);
    const [msg,setMsg] = React.useState('');
    const showMessage = (text) => {
        setMsg(text);
        setTimeout((text) => {
            setMsg('');
        },2000)
    }
    const [crntUser,setCrntUser] = React.useState({
        username:'',
        password:'',
        type:-1
    });
    let login = (user) => {
        setCrntUser({
            username:user.username,
            password:user.password,
            type:user.type
        })
        setIsLoggedIn(true);
    }

    let logout = () => {
        setCrntUser({
            username:'',
            password:'',
            type:-1
        })
        setIsLoggedIn(false);
    }
    // console.log(crntUser);
    return (
        <Router>
            {msg && <h4 className = 'msg'>{msg}</h4>}
            <Nav isLoggedIn = {isLoggedIn} crntUser = {crntUser} logout = {logout}/>
            <Switch>
                <Route path = '/' exact>
                    <Homepage />
                </Route>
                <Route path = '/login'>
                    <LogIn login = {login} showMessage = {showMessage}/>
                </Route>
                <Route path = '/addStudent'>
                    <AddStudent crntUser = {crntUser} isLoggedIn = {isLoggedIn} showMessage = {showMessage}/>
                </Route>
                <Route path = '/addCourse'>
                    <AddCourse isLoggedIn = {isLoggedIn} crntUser = {crntUser} showMessage = {showMessage}/>
                </Route>
                <Route path = '/viewCourses'>
                    <ViewCourses isLoggedIn = {isLoggedIn} crntUser = {crntUser} showMessage = {showMessage}/>
                </Route>
                <Route path = '/addBranch'>
                    <AddBranch isLoggedIn = {isLoggedIn} crntUser = {crntUser} showMessage = {showMessage}/>
                </Route>
                <Route path = '/viewBranches'>
                    <ViewBranches isLoggedIn = {isLoggedIn} crntUser = {crntUser} showMessage = {showMessage}/>
                </Route>
                <Route path = '/addBook'>
                    <AddBook isLoggedIn = {isLoggedIn} crntUser  = {crntUser} showMessage = {showMessage}/>
                </Route>
                <Route path = '/viewBooks'>
                    <ViewBooks isLoggedIn = {isLoggedIn} crntUser  = {crntUser} showMessage = {showMessage}/>
                </Route>
            </Switch>
            <Footer />
        </Router>
    )
}
export default App;