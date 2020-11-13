import React from "react";

const Item = ({id,text,marked,markItem,deleteItem}) => {
    let val = marked == 0 ? '' : 'marked' ;
    return (
        <div className = 'item'>
            <h4 className = {val}>{text}</h4>
            <div className = 'button_box'>
                <button type = 'button' onClick = {() => {
                    markItem(id);
                }}>
                    Mark
                </button>
                <button type = 'button' onClick = {() => {deleteItem(id)}}>Remove</button>
            </div>
            
        </div>
    )
}

export default Item;