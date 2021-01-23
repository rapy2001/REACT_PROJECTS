import React from 'react';
import {useParams, Link} from 'react-router-dom';

const ItemShow = (props) => {

    let params = useParams();
    console.log(params,props);
    if(props.isLoggedIn)
    {
        return (
            <div>
                item show
                {props.type == 2 && <Link to = {`/addEpisode/${params.id}`}>Add Episode</Link>}
            </div>
        )
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