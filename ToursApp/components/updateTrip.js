import React from "react";
import {useParams,useHistory} from "react-router-dom";
import {useState,useEffect} from "react";
import Axios from "axios";
const UpdateTrip = () =>{
    useEffect(() => {
        let obj = {tripId:trip.tripId};
        let data = JSON.stringify(obj);
        Axios.post("http://localhost/projects/TripsApp/API/getTrip.php",data)
        .then((response) => {
            if(response.data.flg == 1)
            {
                setTrip({
                    ...trip,
                    tripName:response.data.tripData.trip_name,
                    tripPrice:response.data.tripData.trip_price,
                    tripDescription:response.data.tripData.trip_description,
                    tripImage:response.data.tripData.trip_image
                });
            }
            else
            {
                setMsg("Failed to Load trip Data");
                setTimeout(function(){
                    setMsg("");
                },2500)
            }
        })
        .catch((err) => {
            setMsg("Internal Server Error");
            setTimeout(function(){
                setMsg("");
            },2500)
        })
    },[])
    let history = useHistory();
    const [trip,setTrip] = useState({
        tripId:useParams().id,
        tripName:"",
        tripPrice:0,
        tripDescription:"",
        tripImage:""
    });
    const [msg,setMsg] = useState("");
    const handleChange = (e) => {
        let newTrip = {
            ...trip,[e.target.name]:e.target.value
        }
        setTrip(newTrip);
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(trip.tripName == '' || trip.tripPrice == '' || trip.tripDescription == '' || trip.tripImage == '')
        {
            setMsg("All fields are Neccesary");
            setTimeout(function(){
                setMsg("");
            },2500);
        }
        let data = JSON.stringify(trip);
        Axios.post("http://localhost/projects/TripsApp/API/updateReactTrip.php",data)
        .then((response) => {
            if(response.data.flg == 1)
            {
                setMsg("Trip Updated successfully");
                setTimeout(function(){
                    setMsg("");
                },2500);
                setTimeout(function(){
                    history.push("/viewTrips");
                },3500)
            }
        })
        .catch((err) => {
            setMsg("Internal Server Error");
            setTimeout(function(){
                setMsg("");
            },2500);
        })
    }
    return(
        <div>
            {msg && <h4>{msg}</h4>}
            <div>
                <form onSubmit = {handleSubmit}>
                    <h3>Add a Tour</h3>
                    <input type = 'text' placeholder = 'Name of the Tour' name = 'tripName' value = {trip.tripName} onChange = {handleChange} autoComplete = 'off'/>
                    <input type = 'text' placeholder = 'Image Url' name = 'tripImage' value = {trip.tripImage} onChange = {handleChange} autoComplete = 'off'/>
                    <input type = 'number' min = '0.0' step = '0.1' name = 'tripPrice' value = {trip.tripPrice} onChange = {handleChange} autoComplete = 'off'/>
                    <textarea name = 'tripDescription' value = {trip.tripDescription} autoComplete = 'off' onChange = {handleChange}>

                    </textarea>
                    <button type = 'submit'>Update</button>
                </form>
            </div>
            <div>
                <h3>Trips App</h3>Trips App
            </div>
        </div>
    )
}

export default UpdateTrip;