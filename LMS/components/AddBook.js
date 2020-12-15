import React from "react";
import Axios from "axios";
import {useHistory} from "react-router-dom";
const AddBook = (props) => {
    let history = useHistory();
    const [book,setBook] = React.useState({
        name:'',
        isbn:'',
        publisher:'',
        edition:0,
        price:0,
        pages:0,
        author:'',
        image:''
    });

    const handleChange = (e) => {
        setBook({
            ...book,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(book.name == '' || book.isbn == '' || book.publisher == '' || book.edition == '' || book.price == '' || book.pages == '' || book.author == '')
        {
            props.showMessage('Please Fill all book details');
        }
        else if(book.isbn.length < 13)
        {
            props.showMessage('Plese Enter a valid ISBN number')
        }
        else if(book.edition < 0)
        {
            props.showMessage('Plese Enter a valid Edition')
        }
        else if(book.price < 0)
        {
            props.showMessage('Plese Enter a valid Price');
        }
        else if(book.pages < 0)
        {
            props.showMessage('Plese Enter a valid Number of pages');
        }
        else
        {
            console.log(book);
            if(book.image === '')
            {
                setBook({
                    ...book,
                    image:'https://cdn.dribbble.com/users/23334/screenshots/5400829/book.jpg?compress=1&resize=800x600'
                })
            }
            Axios.post('http://localhost:5000/addBook',book)
            .then((response) => {
                if(response.data.flg === 1)
                {
                    props.showMessage('Book added successfully');
                    setBook({
                        name:'',
                        isbn:'',
                        publisher:'',
                        edition:0,
                        price:0,
                        pages:0,
                        author:'',
                        image:''
                    })
                    setTimeout(() => {
                        history.push('/');
                    },2500);
                }
                else
                {
                    props.showMessage('Internal Server Error');
                }
            })
            .catch((err) => {
                props.showMessage('No Response from the Server');
            })
        }
    }
    if(props.isLoggedIn)
    {
        if(props.crntUser.type === 1)
        {
            return (
                <div className = 'box addBook'>
                    <div className = 'box_1'>
                        <form className = 'form' onSubmit = {handleSubmit}>
                            <h3>Add a Book</h3>
                            <input
                                type = 'text'
                                value = {book.name}
                                onChange = {handleChange}
                                placeholder = 'Book Name'
                                autoComplete = 'off'
                                name = 'name' 
                            />
                            <input
                                type = 'text'
                                value = {book.isbn}
                                onChange = {handleChange}
                                placeholder = 'ISBN Number'
                                autoComplete = 'off'
                                name = 'isbn' 
                            />
                            <input
                                type = 'text'
                                value = {book.publisher}
                                onChange = {handleChange}
                                placeholder = 'Publisher Name'
                                autoComplete = 'off'
                                name = 'publisher' 
                            />
                            <label>
                                Edition:
                            </label>
                            <input
                                type = 'number'
                                value = {book.edition}
                                onChange = {handleChange}
                                autoComplete = 'off'
                                name = 'edition'
                                min = '1'
                                step = '1' 
                            />
                            <label>
                                Price:
                            </label>
                            <input
                                type = 'number'
                                value = {book.price}
                                onChange = {handleChange}
                                autoComplete = 'off'
                                name = 'price'
                                min = '1'
                                step = '.25' 
                            />
                            <label>
                                Pages:
                            </label>
                            <input
                                type = 'number'
                                value = {book.pages}
                                onChange = {handleChange}
                                autoComplete = 'off'
                                name = 'pages'
                                min = '1'
                                step = '1' 
                            />
                            <input
                                type = 'text'
                                value = {book.author}
                                onChange = {handleChange}
                                placeholder = "Author's Name"
                                autoComplete = 'off'
                                name = 'author' 
                            />
                            <input
                                type = 'text'
                                value = {book.image}
                                onChange = {handleChange}
                                placeholder = "Image Url"
                                autoComplete = 'off'
                                name = 'image' 
                            />
                            <button className = 'btn' type = 'submit'>Add Book</button>
                        </form>
                    </div>
                    <div className = 'box_2'>
                        <h3>LMS</h3>
                    </div>
                </div>
            )
        }
        else
        {
            return (
                <div className = 'empty'>
                    <h4>Only Admins can access this page</h4>
                </div>
            )
        }
    }
    else
    {
        return (
            <div className = 'empty'>
                <h4>Please Log in as Administrator</h4>
            </div>
        )
    }
}
export default AddBook;