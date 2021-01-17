import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
const Movies = (props) => {
    const [genres,setGenres] = React.useState([]);
    const [movies,setMovies] = React.useState([]);
    const fetchGenre = () => {
        fetch('http://192.168.0.6:5000/getGenres')
        .then((response) => response.json())
        .then(async (data) => {
            if(data.flg === 1)
            {
                if(movies.length != data.genres.length)
                {
                    
                    for(let i = 0; i<data.genres.length; i++)
                    {
                        console.log(movies.length);
                        fetchMovies(data.genres[i].genre_id,data.genres[i].genre_name);
                    }   
                }       
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

    const fetchMovies = async (genre,genreName) => {
        await Axios.get(`http://192.168.0.6:5000/getMovies/${genre}`)
        .then(async (response) => {
            if(response.data.flg === 1)
            {
                console.log(movies)
                await setMovies((prevState) => [
                    ...prevState,
                    {name:genreName,data:response.data.movies}
                ])
            }
            else
            {
                props.showMessage(`Error while loading the Movies`,0);
            }
        })
        .catch((err) => {
            props.showMessage(`No Response from the Server. Err: ${err}`,0);
        })
    }

    React.useEffect(async () => {
        fetchGenre();
    },[])
    
          
    console.log(movies);
    return (
        <div>
            <div className = 'header'>
                <Link className = 'logo' to = '/'>Entertainment</Link>
                <div>
                    <Link to = '/shows'>TV Shows</Link>
                    <Link style = {{textDecoration:'bold'}} to = '/movies'>Movies</Link>
                </div>     
            </div>
            <div>

            </div>
        </div>
    )
}
export default Movies;