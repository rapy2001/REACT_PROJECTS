import React from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import {Link} from "react-router-dom";
const Trip = ({trip_id,trip_name,trip_description,trip_image,trip_price,removeTrip}) => {
    const [view,setView] = React.useState(false);
    const [err,setError] = React.useState("");
    const [toggle,setToggle] = React.useState({
        flg:false,
        text:"Read More"
    });
    React.useEffect(()=> {
        if(trip_description.length > 100)
        {
            setView(true);
        }
    },[])
    const handleUD = (flg) => {
        if(flg == 2)
        {
            let obj = {tripId:trip_id};
            let data = JSON.stringify(obj);
            Axios.post("http://localhost/projects/TripsApp/API/deleteTrip.php",data)
            .then((response) => {
                if(response.data.flg == 1)
                {
                    removeTrip(trip_id);
                }
                else
                {
                    setError("Internal Server Error");
                    setTimeout(function(){
                        setError("");
                    },2500);
                }
            })
            .catch((error) => {
                setError("Internal Server Error");
                setTimeout(function(){
                    setError("");
                },2500);
            });
        }
        else if(flg == 1)
        {
            Axios.post("http://localhost/projects/TripsApp/API/addReactTrip.php")
        }
    }
    return (
        <div>
            {err && <h4>{err}</h4>}
            <div>
                <img src = {trip_image} alt = {trip_name}/>
            </div>
            <div>
                <div>
                    <h4>{trip_name}</h4>
                    <h5>$ {trip_price}</h5>
                </div>
                <div>
                    <p>
                        {view ? toggle.flg ? trip_description : trip_description.substring(0,100) : trip_description}
                        {view ? <button type = 'button' onClick = {() => {setToggle((toggle) => {
                            return {
                                flg:!toggle.flg,
                                text:toggle.flg ? 'Read More' : 'Show Less' 
                            }
                        })}}>{toggle.text}</button> : null}
                    </p>
                </div>
                <div>
                    <div>
                        <button type = "button" onClick = {() => {removeTrip(trip_id)}}>Not Interested</button>
                    </div>
                   
                    <div>
                        <Link to = {`/updateTrip/${trip_id}`}>Update</Link>
                        <button type = 'button' onClick = {() => {handleUD(2)}}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Trip.propTypes = {
    id:PropTypes.number.isRequired,
    name:PropTypes.string.isRequired,
    description:PropTypes.string.isRequired,
    image:PropTypes.string.isRequired
}

Trip.defaultProps = {
    id:0,
    name:"NO NAME",
    description:"NO DESCRIPTION",
    image:"https://cdn.dribbble.com/users/4672508/screenshots/11584848/media/bf99e1c02486a053bffcf88366923dae.jpg"
}
export default Trip;