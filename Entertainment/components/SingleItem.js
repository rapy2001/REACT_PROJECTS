import React from 'react';

const SingleItem = (props) => {
    let obj = {
        background:`url(${props.data.movie_image})`,
        backgroundSize:'cover',
        backgroundPosition:'center center'
    }

    let obj_2 = {
        background:`linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url(${props.data.movie_image})`,
        backgroundSize:'cover',
        backgroundPosition:'center center'
    }
    const [type,setType] = React.useState(obj);
    const [box,setBox] = React.useState('singleItemBox hidden')
    return (
        <div className = 'singleItem' style = {type} onMouseEnter = {() => {setType(obj_2); setBox('singleItemBox hidden')}} onMouseLeave = {() => {setType(obj); setBox('singleItemBox show')}}>
            <div className = {box}>
                <h3>{props.data.movie_name}</h3>
                <p>
                    {props.data.description}
                </p>
            </div>
        </div>
    )
}
export default SingleItem;