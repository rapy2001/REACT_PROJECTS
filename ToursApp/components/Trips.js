import React from "react";
import Trip from "./Trip";
import {useState,useEffect} from "react";
import Axios from "axios";
import PropTypes from "prop-types";
const Trips = ({trips}) =>{
    const [tripsValues,setTripsValues] = useState([]);
    const [msg,setMsg] = useState("");
    useEffect(() => {
        let obj = {page_num:1};
        let data = JSON.stringify(obj);
        Axios.post("http://localhost/projects/TripsApp/API/getTrips.php",data)
        .then((response) =>{
            // console.log(response);
            setTripsValues(response.data.trips);
        })
        .catch((err) =>{
            console.log(err);
        })
        setTripsValues(trips);
    },[]);
    const removeTrip = (id) => {
        let newTrips = tripsValues.filter((trip) => trip.trip_id !== id);
        setTripsValues(newTrips);
        setMsg("Trip removed successfully");
        setTimeout(function(){
            setMsg("");
        },2500);
    }
    const ary = tripsValues.map((trip) => {
        return <Trip key = {trip.trip_id} {...trip} removeTrip = {removeTrip}/>
    })
    return (
        <div id = 'viewTrips_div'>
            <h1>Our Trips</h1>
            <div id = 'viewTrips_container'>
                {msg && <h4 className = 'msg'>{msg}</h4>}
                {ary.length > 0 ? ary : <h4>No Trips Yet ...</h4>}
            </div>
        </div>
    )
}

Trips.propTypes = {
    trips:PropTypes.array.isRequired
}

Trips.defaultProps = {
    trips:[]
}
export default Trips;