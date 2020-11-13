import React from "react";
import {useState} from "react";
import AddTour from "./components/AddTour";
import Tour from "./components/Tour";
const App = () =>{
    const [tours,setTours] = useState([]);
    const [form,setForm] = React.useState(false);
    const addTour = (tour) =>{
        let newTours = [
            ...tours,tour
        ]
        setTours(newTours);
    }
    console.log(tours);
    const toggleForm = () =>{
        setForm((form) => {
            return (!form);
        })
    }
    let toursList = tours.map((tour) => {
        return <Tour key = {tour.id} {...tour}/>
    });
    return(
        <div>
            {form || <button type = 'button' onClick = {() => {setForm(true)}}>Add a Tour</button>}
            {(form) ? <AddTour addTour = {addTour} toggleForm = {toggleForm}/>  : null}
            {(form) || <div>
                            {
                                toursList.length > 0 ? toursList : <h4>No Tours yet</h4>
                            }
                        </div>
            }
            
        </div>
    );
}
export default App;