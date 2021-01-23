import React from 'react';
import {useParams,useHistory} from 'react-router-dom';
import Axios from 'axios';
const AddEpisode = (props) => {
    let params = useParams();
    let id = params.id;
    let history = useHistory();
    const [episode,setEpisode] = React.useState({
        name:'',
        description:'',
        image:''
    })
    const onChange = (e) => {
        setEpisode((episode) => {
            return {
                ...episode,
                [e.target.name]:e.target.value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(episode.name === '')
        {
            props.showMessage('Name of the Episode can not be empty');
        }
        else if(episode.description === '')
        {
            props.showMessage('Please give an Episode Description');
        }
        else
        {
            Axios.post(`http://192.168.0.5:5000/addEpisode`,{...episode,showId:id})
            .then((response) => {
                if(response.data.flg == 1)
                {
                    props.showMessage('Episode added',1);
                    setEpisode({
                        name:'',
                        description:'',
                        image:''
                    })
                    setTimeout(() => {
                        history.push(`/viewShow/${id}`)
                    },2500)   
                }
                else
                {
                    props.showMessage('Error while adding the Episode',2);
                }
            })
            .catch((err) => {
                props.showMessage('No Response from the Server ' + err);
            })
            // fetch(`http://192.168.0.5:5000/addEpisode`,{
            //     method:'POST',
            //     body:JSON.stringify({...episode,showId:id})
            // })
            // .then((response) => {
            //     return response.json();
            // })
            // .then((data) => {
            //     if(data.flg == 1)
            //     {
            //         props.showMessage('Episode added');
            //     }
            //     else
            //     {
            //         props.showMessage('Error while adding the Episode');
            //     }
            // })
            // .catch((err) => {
            //     props.showMessage('No Response from the Server')
            // })
        }
    }
    if(props.crntUser.username === 'Admin')
    {
        // console.log(id);
        return (
            <div>
                <form onSubmit = {handleSubmit}>
                    <input
                        type = 'text'
                        name = 'name'
                        autoComplete = 'off'
                        placeholder = 'Episode Name' 
                        onChange = {onChange}
                    />
                    <input
                        type = 'text'
                        name = 'description'
                        autoComplete = 'off'
                        placeholder = 'Episode Description' 
                        onChange = {onChange}
                    />
                    <input
                        type = 'text'
                        name = 'image'
                        autoComplete = 'off'
                        placeholder = 'Episode Image' 
                        onChange = {onChange}
                    />
                    <button type = 'submit'>Add Episode</button>
                </form>
            </div>
        )
    }
    else
    {
        return (
            <div>
                <h4>Not Authorized to access this page</h4>
            </div>
        )
    }
}
export default AddEpisode;