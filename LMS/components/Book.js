import React from "react";

const Book = (props) => {
    console.log(props);
    return (
        <div className = 'book'>
            <div className = 'upd_form_cut'> 
                <h4 onClick = {props.cutShow}><i className = 'fa fa-times'></i></h4>
            </div>
            <div className = 'book_container'>
                <div className = 'book_box_1'>
                    <img src = {props.image} alt = {props.name}/>
                </div>
                <div className = 'book_box_2'>
                    <h1><span>Name:</span> {props.name}</h1>
                    <h1><span>Author:</span> {props.author}</h1>
                    <h1><span>ISBN:</span> {props.isbn}</h1>
                    <h1><span>Publisher:</span> {props.publisher}</h1>
                    <h1><span>Edition:</span> {props.edition}</h1>
                    <h1><span>Price:</span> Rs. {props.price}</h1>
                    <h1><span>Pages:</span> {props.pages}</h1>
                </div>
            </div>
        </div>
    )
}
export default Book;