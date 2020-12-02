import React from "react";
import {Switch,BrowserRouter as Router,Route} from "react-router-dom";
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