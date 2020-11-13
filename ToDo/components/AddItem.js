import React from "react";
import {useState} from "react";
const id = new Date().getTime().toString();
const AddItem = ({addItem}) =>{
    const [item,setItem] = useState({id:id,text:"",marked:0});
    const handleChange = (e) => {
        let curItem = {
            ...item,text:e.target.value
        }
        setItem(curItem);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addItem(item);
        setItem({id:new Date().getTime().toString(),text:"",marked:0});
    }
    return (
        <div className = 'addItem'>
            <form onSubmit = {handleSubmit}>
                <input type = 'text' placeholder = 'To Do' name = 'item' value = {item.text} onChange = {handleChange} autoComplete = 'off'/>
                <button type = 'submit'>Add</button>
            </form>
        </div>
    )
}

export default AddItem;