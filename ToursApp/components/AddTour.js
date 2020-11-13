import React from "react";
import {useState} from "react";
const AddTour = ({addTour,toggleForm}) =>{
    // React.useEffect(()=>{
        // setTimeout(function(){
        //     setMsg({
        //         show:false,
        //         msg:""
        //     })
    //     },2500)
    // })
    const [tour,setTour] = useState({
        id:new Date().getTime().toString(),
        name:"",
        image:"",
        price:0,
        description:""
    });
    const [msg,setMsg] = useState({
        show:false,
        content:""
    });
    const handleChange = (e) =>{
        setTour({
            ...tour,[e.target.name]:e.target.value
        });
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(tour.name == '' || tour.image == '' || tour.price == '' || tour.description == '')
        {
            setMsg({
                show:true,
                msg:"All fields are Mandatory"
            });
            setTimeout(function(){
                setMsg({
                    show:false,
                    msg:""
                })
            },2500);
        }
        else
        {
            addTour(tour);
            setTour({
                id:new Date().getTime().toString(),
                name:"",
                image:"",
                price:0,
                description:""
            })
            setTimeout(function(){
                toggleForm();
            },3500);
            setMsg({
                show:true,
                msg:"Tour added Successfully"
            });
            setTimeout(function(){
                setMsg({
                    show:false,
                    msg:""
                })
            },2500);
        }
        
    }
    return (
        <div className = 'box'>
            <div className = 'box_1'>
                {msg.show && <h4>{msg.msg}</h4>}
                <form onSubmit = {handleSubmit}>
                    <h3>Add a Tour</h3>
                    <input type = 'text' placeholder = 'Name of the Tour' name = 'name' value = {tour.name} onChange = {handleChange} autoComplete = 'off'/>
                    <input type = 'text' placeholder = 'Image Url' name = 'image' value = {tour.image} onChange = {handleChange} autoComplete = 'off'/>
                    <input type = 'number' min = '0.0' step = '0.1' name = 'price' value = {tour.price} onChange = {handleChange} autoComplete = 'off'/>
                    <textarea name = 'description' value = {tour.description} autoComplete = 'off' onChange = {handleChange}>

                    </textarea>
                    <button type = 'submit'>Submit</button>
                </form>
            </div>
            <div className = 'box_2'>
                <h3>Tours App</h3>
            </div>
            
        </div>
    )
}
export default AddTour;