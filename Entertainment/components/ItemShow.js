import React from 'react';
import {useParams, Link} from 'react-router-dom';
import Axios from 'axios';

const ItemShow = (props) => {

    let params = useParams();
    // console.log(params);
    const [DATA,setData] = React.useState({});
    const [loading,setLoading] = React.useState(true);
    React.useEffect(() => {
        if(props.type === 2)
        {
            Axios.get(`http://192.168.0.5:5000/getShow/${params.id}`)
            .then((response) => {
                if(response.data.flg === 1)
                {
                   
                    setData(response.data.data);
                    setLoading(false);
                    // setData(false);
                    // console.log(response.data.data,DATA);
                }
                else
                {
                    props.showMessage('Internal Server Error',2)
                }
            })
            .catch((err) => {
                props.showMessage('No Response from the Server',2)
            })
        }
        else
        {
            Axios.get(`http://192.168.0.5:5000/getMovie/${params.id}`)
            .then((response) => {
                if(response.data.flg === 1)
                {
                    setData(response.data.data);
                }
                else
                {
                    props.showMessage('Internal Server Error',2)
                }
            })
            .catch((err) => {
                props.showMessage('No Response from the Server',2)
            })
        }
    },[])
    console.log(DATA);
    if(props.isLoggedIn)
    {
        if(props.type === 2)
        {
            // console.log(data);
            let styleObj = null;
            if(DATA.show !== undefined)
                styleObj = {
                    background:DATA.show.show_image
                }
            let episodes = [];
            if(DATA.episodes !== undefined && DATA.episodes.length > 0)
                episodes = DATA.episodes.map((episode) => {
                    return (
                        <div key = {episode.episode_id}>
                            <div>
                                <img src = {episode.episode_image}/>
                            </div>
                            <div>
                                <h3>{episode.episode_name}</h3>
                                <p>
                                    {episode.episode_description}
                                </p>
                            </div>
                        </div>
                    )
                })
                if(!loading)
                {
                    return (
                        <div>
                            <div style = {styleObj}>
                                <Link to = {`/addEpisode/${params.id}`}>Add Episode</Link>
                                <div>
                                    <h1>{DATA.show.show_name}</h1>
                                    <p>
                                        {DATA.show.description}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h2>Episodes:</h2>
                                {episodes}     
                            </div>
                            
                        </div>
                    )
                }
                else
                {
                    return(
                        <div>
                            <h4>Loading</h4>
                        </div>
                    )
                }
        }
        else
        {
            let styleObj = {
                background:DATA.movie.movie_image
            }
            if(!loading)
            {
                return (
                    <div style = {styleObj}>
                        <div>
                            <h1>{DATA.movie.movie_name}</h1>
                            <p>
                                {DATA.movie.description}
                            </p>   
                        </div>      
                    </div>      
                )
            }
            else
            {
                return(
                    <div>
                        <h4>Loading</h4>
                    </div>
                )
            }
        }
    }
    else
    {
        return (
            <div>
                <h4>Please Log in to View this Page</h4>
            </div>
        )
    }
}

export default ItemShow;