import React from 'react';
import {Link,useHistory} from 'react-router-dom';
import Axios from 'axios';
const AddItem = (props) => {
    let history = useHistory();
    const [item,setItem] = React.useState({
        name:'',
        image:'',
        genre:-1,
        description:'',
        type:-1
    })
    const [genres,setGenres] = React.useState([]);
    const handleChange = (e) => {
        setItem({
            ...item,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(item);
        if(item.name === '' || item.image === '' || item.description === '')
        {
            props.showMessage('Name, Image or Description Fields can not be empty',0);
        }
        else if(item.gen === -1)
        {
            props.showMessage('Please Select a Genre',0);
        }
        else if(item.type === -1)
        {
            props.showMessage('Please Choose Movie or TV Show',0);
        }
        else
        {
            Axios.post('http://192.168.0.6:5000/addItem',{name:item.name,image:item.image,genre:item.genre,description:item.description,type:item.type})
            .then((response) => {
                if(response.data.flg === 1)
                {
                    props.showMessage('Item Added',1);
                    setTimeout(() => {
                        history.push('/');
                    },2000)
                }
                else
                {
                    props.showMessage(`Error while adding Item`,0)
                }
            })
            .catch((err) => {
                props.showMessage(`No Response from the Server while adding the Item. Err: ${err}`,0)
            })
            // fetch('http://192.168.0.6:5000/addItem',{
            //     method:'POST',
            //     body:JSON.stringify(item)
            // })
            // .then((response) => response.json())
            // .then((data) => {
            //     if(data.flg === 1)
            //     {
            //         props.showMessage('Item Added',1);
            //         setTimeout(() => {
            //             history.push('/');
            //         },2000)
            //     }
            //     else
            //     {
            //         props.showMessage(`Error while adding Item`,0)
            //     }
            // })
            // .catch((err) => {
            //     props.showMessage(`No Response from the Server while adding the Item. Err: ${err}`,0)
            // })
        }
    }
    const fetchGenre = () => {
        fetch('http://192.168.0.6:5000/getGenres')
        .then((response) => response.json())
        .then((data) => {
            if(data.flg === 1)
            {
                // console.log(data.genres);
                setGenres(data.genres);
            }
            else
            {
                props.showMessage(`Error while fetching the Genres`,0)
            }
        })
        .catch((err) => {
            props.showMessage(`No Response from the Server while fetching the Genres. Err: ${err}`,0)
        })
    }

    React.useEffect(() => {
        fetchGenre();
    },[])
    if(props.username === 'Admin')
    {
        return (
            <div className = 'login'>
    
                <div className = 'loginBox_1 addItem'>
                    <div className = 'header'>
                       <Link className = 'logo' to = '/'>Entertainment</Link>
                       <Link className = 'link' to = '/signup'>
                           Sign In
                       </Link>
                   </div>
                   <div className = 'loginFormBox'>
                       <form className = 'form' onSubmit = {handleSubmit}>
                            <h3>Add</h3>
                            <input
                                type = 'text'
                                placeholder = 'Name'
                                autoComplete = 'off'
                                value = {item.name}
                                onChange = {handleChange} 
                                name = 'name'
                            />
                            <input
                                type = 'text'
                                placeholder = 'Image URL'
                                autoComplete = 'off'
                                value = {item.image}
                                onChange = {handleChange} 
                                name = 'image'
                            />
                            <input
                                type = 'text'
                                placeholder = 'Description'
                                autoComplete = 'off'
                                value = {item.description}
                                onChange = {handleChange} 
                                name = 'description'
                            />
                            <div className = 'selectDiv'>
                                <label>
                                    Genre :
                                </label>
                                <select onChange = {handleChange} name = 'genre' value = {item.genre}>
                                    <option value = '-1'>
                                        --Genre--
                                    </option>
                                    {genres.map((genre) => {
                                        return (
                                            <option key = {genre.genre_id} value = {genre.genre_id}>{genre.genre_name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className = 'selectDiv'>
                                <label>
                                    Movie or TV Show :
                                </label>
                                <select onChange = {handleChange} name = 'type' value = {item.type}>
                                    <option value = '-1'>
                                        --Movie-OR-Show
                                    </option>
                                    <option value = '1'>
                                        TV Show
                                    </option>
                                    <option value = '2'>
                                        Movie
                                    </option>
                                </select>
                            </div>
                            
                            <button className = 'btn' type = 'submit'>
                                Add
                            </button>
                       </form>
                   </div>
                </div>
                <div class="part_8">
                    <div class="part_8_box_2">
                        <div class="part_8_box_2_box_1">
                            <div>
                                <h2>SHOP</h2>
                                <h3>Always Pan</h3>
                                <h3>Main Plates</h3>
                                <h3>Side Bowls</h3>
                                <h3>Drinking Glasses</h3>
                                <h3>Dinner for 4</h3>
                            </div>
                            <div>
                                <h2>COMPANY</h2>
                                <h3>Mission</h3>
                                <h3>FAQs</h3>
                            </div>
                            <div>
                                <h2>SOCIAL</h2>
                                <h3>Instagram</h3>
                                <h3>twitter</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = 'footer'>
                    <h4>2020. Rajarshi Saha</h4>
                </div>
            </div>
        )
    }
    else
    {
        return (
            <div>
                <h4>You are not authorized to view this Page</h4>
            </div>
        )
    }
    
}
export default AddItem;