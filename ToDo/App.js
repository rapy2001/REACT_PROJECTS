import React, {useState} from "react";
import AddItem from "./components/AddItem";
import Item from "./components/Item";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import "./public/style.css";
const App = () => {
    const [items,setItems] = useState([]);
    const addItem = (item) => {
        setItems((items) => {
            return [...items,item];
        });
    }
    const markItem = (id) => {
        let newItems = items.map((item) => {
            if(item.id == id)
            {
                let marked = item.marked == 0 ? 1 : 0;
                return ({
                    ...item,
                    marked:marked
                });
            }
            else
            {
                return item;
            }
                
        });
        setItems(newItems);
    }

    const deleteItem = (id) =>{
        let newItems = items.filter((item) => {
            return item.id !== id
        });
        setItems(newItems);
    }
    let views = items.map((item) => {
                                        return <Item key = {item.id} {...item} markItem = {markItem} deleteItem = {deleteItem}/>
                                    })
    return (
        <div className = 'App'>
            <Nav />
            <div className = 'container'>
                <h1>Add a To Do</h1>
                <div className = 'box'>
                    
                    <AddItem addItem = {addItem}/>
                    <div className = 'items'>
                        {
                            (views.length > 0 ) ? views: <h4>No To Dos Yet ...</h4>
                        }
                    </div>
                    
                </div>
                
            </div>
            <Footer />
        </div>
    )
}

export default App;