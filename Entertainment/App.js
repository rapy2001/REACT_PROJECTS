import React from "react";
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import './public/style.css';
import Homepage from './components/Homepage';
const App = () => {
    const [isLoggedIn,setIsLoggedIn] = React.useState(false);
    const [crntUser, setCrntUser] = React.useState({
        username:'',
        userId:-1
    })
    return (
        <Router>
            <Switch>
                <Route path = '/' exact>
                    <Homepage />
                </Route>
            </Switch>
        </Router>
    )
}
export default App;