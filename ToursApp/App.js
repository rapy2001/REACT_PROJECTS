import React from "react";
import {useState} from "react";
import Homepage from "./components/Homepage";
import Nav from "./components/Nav";
import Error from "./components/ErrorPage";
import AddTour from "./components/AddTour";
import Trips from "./components/Trips";
import UpdateTrip from "./components/updateTrip";
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
const App = () =>{
    const [tours,setTours] = useState([]);
    const addTour = (tour) =>{
        let newTours = [
            ...tours,tour
        ]
        setTours(newTours);
    }
    return(
        <Router>
            <Nav />
            <Switch>
                <Route exact path = '/'>
                    <Homepage />
                </Route>
                <Route exact path = '/addTrip'>
                    <AddTour addTour = {addTour}/>
                </Route>
                <Route exact path = '/viewTrips'>
                    <Trips trips = {tours}/>
                </Route>
                <Route exact path = '/updateTrip/:id'>
                    <UpdateTrip />
                </Route>
                <Route path = "*">
                    <Error />
                </Route>
                
            </Switch>
        </Router>
       
    );
}

export default App;