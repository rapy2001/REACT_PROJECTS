import React from "react";
const AddPost = (props) => {
    const [post,setPost] = React.useState({
        title:'',
        description:'',
        image:'',
        userId:props.crntUser.userId
    })
    const [msg,setMsg] = React.useState('');
    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://192.168.0.6:5000/addPost',{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body:JSON.stringify(post)
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data.flg === 1)
            {
                // setMsg('Post created');
                // setTimeout(function(){
                //     setMsg('');
                // },2500)
                props.toggleForm(0);
            }
            else
            {
                setMsg('Internal Server Error');
                setTimeout(function(){
                    setMsg('');
                },2500)
            }
        })
        .catch((err) =>{
            setMsg('No response from the server');
            setTimeout(function(){
                setMsg('');
            },2500)
        })
    }
    return (
        <div className = 'post'>
            <h3 onClick = {() => {props.toggleForm(0)}}><i className = 'fa fa-times post_cut'></i></h3>
            <div className = 'post_container'>
                {msg && <h4 className = 'msg'>{msg}</h4>}
                <form onSubmit = {handleSubmit} className = 'form'>
                    <h3>Add a Post</h3>
                    <input
                        type = 'text'
                        name = 'title'
                        value = {post.title}
                        placeholder = 'Post Tite'
                        autoComplete = 'off'
                        onChange = {handleChange}
                    />
                    <input
                        type = 'text'
                        name = 'image'
                        value = {post.image}
                        placeholder = 'Post Image'
                        autoComplete = 'off'
                        onChange = {handleChange}
                    />
                    <textarea
                        value = {post.description}
                        name = 'description'
                        onChange = {handleChange}
                        autoComplete = 'off'
                    >

                    </textarea>
                    <button className = 'btn' type = 'Submit'>Add Post</button>
                </form>
            </div>
        </div>
    )
}
export default AddPost;