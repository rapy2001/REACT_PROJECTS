import React from "react";
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Homepage from './components/Homepage';
const App = () => {
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