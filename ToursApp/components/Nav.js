import React from "react";
import {Link} from "react-router-dom";
const Nav = () => {
    return (
        <nav>
            <div>
                <Link to = '/'>Trips App</Link>
            </div>
            <div>
                <Link to = '/addTrip'>Add a Trip</Link>
                <Link to = '/viewTrips'>View Trips</Link>
            </div>
        </nav>
    )
}
export default Nav;