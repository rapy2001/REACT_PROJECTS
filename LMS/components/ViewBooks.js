import React from "react";
import Book from "./Book";
const ViewBooks = (props) => {
    const [books,setBooks] = React.useState([]);
    const [show,setShow] = React.useState({
        display:false,
        book:{}
    });
    const fetchBooks = () => {
        fetch('http://localhost:5000/getBooks')
        .then((response) => response.json())
        .then((data) => {
            if(data.flg === 1)
            {
                // console.log(data);
                setBooks(data.books);
            }
            else
            {
                props.showMessage("Error while loading the Books List");
            }
        })
        .catch((err) => {
            props.showMessage('No Response from the Server')
        })
    }
    React.useEffect(() => {
        fetchBooks();
    },[])
    const handleShow = (book) => {
        setShow({
            display:true,
            book:book
        });

    }
    const cutShow = () => {
        setShow({
            display:false,
            book:{}
        });
    }
    if(props.crntUser.type === 1)
    {

    }
    else
    {
        let bookAry = [];
        if(books.length > 0)
        {
            bookAry = books.map((book) => {
                return (
                    <tr key = {book.book_id} onClick = {() => {handleShow(book)}} data-id = {book.book_id} >
                        <td>{book.name}</td>
                        <td>{book.isbn}</td>
                        <td>{book.publisher}</td>
                        <td>{book.edition}</td>
                        <td>{book.price}</td>
                        <td>{book.pages}</td>
                        <td>{book.author}</td>
                    </tr>
                )
            })
        }
        return (
            <div className = 'viewBooks'>
                {show.display && <Book {...show.book} cutShow = {cutShow}/>}
                <div className = 'books_container'>
                    <h3>Books</h3>
                    <table className = 'table'>
                        <thead>
                            <tr>
                                <th>Book Name</th>
                                <th>ISBN Number</th>
                                <th>Publisher</th>
                                <th>Edition</th>
                                <th>Price</th>
                                <th>Pages</th>
                                <th>Author</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookAry.length > 0 ? bookAry : <tr>No Books Yet ....</tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default ViewBooks;