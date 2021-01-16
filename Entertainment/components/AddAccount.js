import React from 'react';
import Axios from 'axios';
const AddAccount = (props) => {
    const [name,setName] = React.useState('');
    const handleChange = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('http://192.168.0.6:5000/addAccount',{userId:props.userId,name:name})
        .then((response) => {
            console.log(response.data);
            if(response.data.flg == 1)
            {
                setName('');
                props.Form();
                props.fetchAccounts();
            }
            else if(response.data.flg == 2)
            {
                props.showMessage('Maximum 4 Accounts',0);
            }
            else if(response.data.flg == 3)
            {
                props.showMessage('The account already exists',0);
            }
            else
            {
                props.showMessage('Internal Server Error',0);
            }
        })
        .catch((err) => {
            props.showMessage(`No Response from the Server. Err: ${err}`);
        })
    }
    return (
        <div>
            <div>
                <h4><i className = 'fa fa-times'></i></h4>
            </div>
            <div>
                <form onSubmit = {handleSubmit}>
                    <input
                        type = 'text'
                        name = 'name'
                        value = {name}
                        onChange = {handleChange}
                        placeholder = 'Account Name'
                        autoComplete = 'off'
                    />
                    <button type = 'submit'>
                        Add
                    </button>
                </form>
            </div>
        </div>
    )
}
export default AddAccount;