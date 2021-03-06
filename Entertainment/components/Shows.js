import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import SingleItem from './SingleItem';
const Shows = (props) => {
    let chosen = null;
    const [data,setData] = React.useState([]);
    const fetchGenre = () => {
        fetch('http://192.168.0.5:5000/getItems/1')
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
    console.log(data,chosen);
    if(data.length > 0)
    {
        
        for(let i = 0; i < data.length; i++)
        {
            if(data[i].items.length > 0)
            {
                let temp = [];
                for(let j = 0; j<data[i].items.length; j++)
                {
                    temp.push(
                        <SingleItem type = {2} key = {data[i].items[j].show_id} data = {data[i].items[j]}/>
                    )
                }
                ary.push(
                    <div>
                        <h1>{data[i].genre.genre_name}</h1>
                        <div>
                            {temp}
                        </div>
                    </div>
                )
            }
            else
            {
                ary.push(
                    <div>
                        <h1>{data[i].genre.genre_name}</h1>
                        <div>
                            <h4>No TV Shows in this Genre</h4>
                        </div>
                    </div>
                )
            }
            
        }
    }
    if(props.isLoggedIn)
    {
        // console.log(data);
        let obj = null;
        if(chosen !== null)
        {
            let obj = {
                    background:`linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url(${chosen.movie_image})`,
                    backgroundSize:'cover',
                    backgroundPosition:'center center'
                }
        }
            
        return (
            <div className = 'item'>
                <div className = 'header'>
                    <Link className = 'logo' to = '/'>Entertainment</Link>
                     
                    <div className = 'header_box'>
                        <div className = 'header_box_1'>
                            <Link style = {{textDecoration:'bold'}} to = '/shows'>TV Shows</Link>
                            <Link to = '/movies'>Movies</Link>
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
                        chosen !== null  && 
                            <div className = 'item_box_1' style = {obj}>
                                <div className = 'item_box_1_box'>
                                    <h1>{chosen.show_name}</h1>
                                    <p>
                                        {chosen.description}
                                    </p>
                                    <div>
                                        <h4>Play</h4>
                                    </div>
                                </div>
                            </div>
                    }
                    {data.length > 0 ? ary: <div>
                        <h4>No TV Shows</h4>
                    </div> }
                </div>
            </div>
        )
    }
    else
    {
        return (
            <div>
                <div className = 'header'>
                    <Link className = 'logo' to = '/'>Entertainment</Link>
                    <div>
                        <Link to = '/signin'>Sign In</Link>
                    </div>     
                </div>
                <div>
                    <h4>Please Sign In to access this Page</h4>
                </div>
            </div>
        )
    }
}
export default Shows;