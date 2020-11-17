import React from "react";
import {useState} from "react";
import Axios from "axios";
import {useParams} from "react-router-dom";
// import {obj} from "../App";
import Message from "./Message";
const Texts = function({crntUser,isLoggedIn}) {
    const [messages,setMessages] = React.useState([]);
    const [msg,setMsg] = React.useState('');
    const [message,setMessage] = React.useState('');
    // let {crntUser,isLoggedIn} = React.useContext(obj);
    let {friendId} = useParams();
    console.log(useParams());
    const handleChange = (e) => {
        setMessage(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(message === '')
        {
            setMsg('Message Text can not be empty');
            setInterval(function(){
                setMsg('');
            },2500);
        }
        else
        {
            
            let val = {userId:crntUser.id,friendId,message};
            let data = JSON.stringify(val);
            Axios.post("http://localhost/projects/ChatApp/API/addMessage.php",data)
            .then((response) => {
                if(response.data.flg === 1)
                {
                    setMsg('Message Sent');
                    setInterval(function(){
                        setMsg('');
                    },2500);
                    setMessage('');
                }
                else
                {
                    setMsg('Internal Server Error');
                    setInterval(function(){
                        setMsg('');
                    },2500);
                }
            })
            .catch((err) => {
                setMsg('Error while sending the Message');
                setInterval(function(){
                    setMsg('');
                },2500);
            })
        }
       
    }
    
    let interval = '';
    const loadMessages = () => {
        let val = {userId:crntUser.id,friendId};
        let data = JSON.stringify(val);
        Axios.post("http://localhost/projects/ChatApp/API/getMessages.php",data)
        .then((response) => {
            if(response.data.flg == 1)
            {
                setMessages(response.data.messages);
            }
        })
        .catch((err) => {
            setMsg('Error While Loading Messages');
            setTimeout(function(){
                setMsg('');
            },2500);
        })
    }
    React.useEffect(() => {
        interval = setInterval(function(){
            loadMessages();
        },2000);
        return () => {
            clearInterval(interval);
        }
    },[])
    if(isLoggedIn)
    {
        if(messages.length > 0)
        {
            return (
                <div>
                    {msg && <h4>{msg}</h4>}
                    <div>
                        {
                            messages.map((message,index) => {
                                return <Message key = {message.message_id} {...message}/>
                            })
                        }
                    </div>
                    <div>
                        <form onSubmit = {handleSubmit}>
                            <input type = 'text' name = 'text' value = {message} placeholder = 'Message' onChange = {handleChange}/>
                            <input type = 'submit' value = 'send'/>
                        </form>
                    </div>
                </div>
            )
        }
        else
        {
            return (
                <div>
                    <div>
                        <form onSubmit = {handleSubmit}>
                            <input type = 'text' name = 'text' value = {message} placeholder = 'Message' onChange = {handleChange}/>
                            <input type = 'submit' value = 'send'/>
                        </form>
                    </div>
                    <h4>No Messages Yet ...</h4>
                </div>
            )
        }
    }
    else
    {
        return (
            <div>
                <h4>Please Log In to view Messages</h4>
            </div>
        )
    }
}

// const Texts = () => {
//     const [val,setVal] = useState('');        
//     return (<></>)
// }
export default Texts;