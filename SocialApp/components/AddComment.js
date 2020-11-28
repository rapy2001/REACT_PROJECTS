import React from "react";

const AddComment = ({crntUser,postId,toggleCommentForm}) => {
    const [text,setText] = React.useState('');
    const [msg,setMsg] = React.useState('');
    const addComment = (commentText) => {
        fetch('http://localhost:5000/addComment',{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body:JSON.stringify({userId:crntUser.userId,postId:postId,commentText:commentText})
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data.flg === 1)
            {
                toggleCommentForm(0);
            }
            else
            {
                setMsg('Internal Server Error');
                setTimeout(function(){
                    setMsg('');
                },2500)
            }
        })
        .catch((err) => {
            setMsg('No Response from the Server');
            setTimeout(function(){
                setMsg('');
            },2500)
        })
    }
    const handleChange = (e) => {
        setText(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        addComment(text);
    }
    return(
        <div>
            {msg && <h4>{msg}</h4>}
            <form onSubmit = {handleSubmit}>
                <input
                    type = 'text'
                    name = 'text'
                    placeholder = 'Your Comment'
                    value = {text}
                    autoComplete = 'off'
                    onChange = {handleChange}
                />
                <button type = 'submit'>
                    Add Comment
                </button>
            </form>
        </div>
    )
}
export default AddComment;