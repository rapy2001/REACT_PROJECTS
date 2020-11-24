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
    let obj = React.useRef(null);
    // console.log(obj);
    // let {crntUser,isLoggedIn} = React.useContext(obj);
    let {friendId} = useParams();
    // console.log(useParams());
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
            // Axios.post("http://localhost/projects/ChatApp/API/addMessage.php",data)
            // .then((response) => {
            //     if(response.data.flg === 1)
            //     {
                    // setMsg('Message Sent');
                    // setInterval(function(){
                    //     setMsg('');
                    // },2500);
                    // setMessage('');
            //     }
            //     else
            //     {
                    // setMsg('Internal Server Error');
                    // setInterval(function(){
                    //     setMsg('');
                    // },2500);
            //     }
            // })
            // .catch((err) => {
                // setMsg('Error while sending the Message');
                // setInterval(function(){
                //     setMsg('');
                // },2500);
            // })
            fetch('http://192.168.0.6:5000/addMessage',{
                headers:{
                    'Content-Type':'application/json'
                },
                method:'POST',
                body:JSON.stringify({userId:crntUser.id,friendId:friendId,message:message})
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.flg === 1)
                {
                    setMsg('Message Sent');
                    setInterval(function(){
                        setMsg('');
                    },2500);
                    setMessage('');
                    // obj.current.scrollHeight = obj.current.clientHeight; 
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
        // Axios.post("http://localhost/projects/ChatApp/API/getMessages.php",data)
        // .then((response) => {
            // if(response.data.flg == 1)
            // {
            //     setMessages(response.data.messages);
            // }
        // })
        // .catch((err) => {
        //     setMsg('Error While Loading Messages');
        //     setTimeout(function(){
        //         setMsg('');
        //     },2500);
        // })
        fetch('http://192.168.0.6:5000/getMessages/' + crntUser.id + '/' + friendId)
        .then((response) => response.json())
        .then((data) => {
            if(data.flg == 1)
            {
                setMessages(data.messages);
            }
        })
        .catch((err) => {
            setMsg('No Response from the server');
            setTimeout(function(){
                setMsg('');
            },2500);
        })
    }
    React.useEffect(() => {
        interval = setInterval(function(){
            loadMessages();
        },500);
        return () => {
            clearInterval(interval);
        }
    },[])
    if(isLoggedIn)
    {
        if(messages.length > 0)
        {
            return (
                <div className = 'texts'>
                    {msg && <h4 className = 'msg'>{msg}</h4>}
                    <div className = 'texts_box'>
                        <h1>Your Messages</h1>
                        <div className = 'texts_container' ref = {obj}>
                            {
                                messages.map((message,index) => {
                                    return <Message crntUser = {crntUser} key = {message.message_id} {...message}/>
                                })
                            }
                        </div>
                        <div className = 'texts_form_div'>
                            <form onSubmit = {handleSubmit}>
                                <input autoComplete = 'off' type = 'text' name = 'text' value = {message} placeholder = 'Message' onChange = {handleChange}/>
                                <input type = 'submit' value = 'send'/>
                            </form>
                        </div>
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
            <div className = 'empty'>
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