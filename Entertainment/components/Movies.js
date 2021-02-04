import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import SingleItem from './SingleItem';
const Movies = (props) => {
    let chosen = {};
    const [data,setData] = React.useState([]);
    const fetchGenre = () => {
        fetch('http://192.168.0.5:5000/getItems/2')
        .then((response) => response.json())
        .then(async (data) => {
            if(data.flg === 1)
            {
                setData(data.data);
                for(let i = 0; i < data.length; i++)
                {
                    if(data[i].items.length > 0)
                    {
                        chosen = data[i].items[0];
                    }
                }
            }
            else
            {
                props.showMessage('Internal Server Error');
            }
        })
        .catch((err) => {
            props.showMessage(`No Response from the Server while fetching the Genres. Err: ${err}`,0)
        })
    }


    React.useEffect(async () => {
        fetchGenre();
    },[])
    let ary = [];
    
    if(data.length > 0)
    {
        
        for(let i = 0; i < data.length; i++)
        {
            if(data[i].items.length > 0)
            {
                chosen = data[i].items[0];
                let temp = [];
                for(let j = 0; j<data[i].items.length; j++)
                {
                    temp.push(
                        <SingleItem type = {1} key = {data[i].items[j].movie_id} data = {data[i].items[j]}/>
                    )
                }
                ary.push(
                    <div className = 'genreBox'>
                        <h1>{data[i].genre.genre_name}</h1>
                        <div className = 'genreBox_items'>
                            {temp}
                        </div>
                    </div>
                )
            }
            else
            {
                ary.push(
                    <div className = 'genreBox'>
                        <h1>{data[i].genre.genre_name}</h1>
                        <div className = 'genreBox_items'>
                            <h4>No Movies in this Genre</h4>
                        </div>
                    </div>
                )
            }
            
        }
    }
    
    let obj = {
        background:`linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url(${chosen.movie_image})`,
        backgroundSize:'cover',
        backgroundPosition:'center center'
    }
    if(props.isLoggedIn)
    {
        return (
            <div className = 'item'>
                <div className = 'header'>
                    <Link className = 'logo' to = '/'>Entertainment</Link>
                    
                    <div className = 'header_box'>
                        <div className = 'header_box_1'>
                            <Link to = '/shows'>TV Shows</Link>
                            <Link style = {{textDecoration:'bold'}} to = '/movies'>Movies</Link>
                        </div>
                        <div className = 'header_box_2'>
                            {
                                props.isLoggedIn === false ?  
                                    <Link className = 'link' to = '/signin'>
                                        Sign In
                                    </Link>
                                :
                                    <button className = 'btn' onClick = {() => props.logout()} >Log Out ({props.crntUser.username})</button>
                            }
                        </div>
                        
                    </div> 
                </div>
                <div>
                    {
                        data.length > 0 ? 
                            <div className = 'item_box_1' style = {obj}>
                                <div className = 'item_box_1_box'>
                                    <h1>{chosen.movie_name}</h1>
                                    <p>
                                        {chosen.description}
                                    </p>
                                    <div>
                                        <h4>Play</h4>
                                    </div>
                                </div>
                            </div>
                            :
                            null
                    }
                    {data.length > 0 ? ary: <div>
                        <h4>No Movies</h4>
                    </div> }
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
}
export default Movies;