import React from 'react';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';
import AddAccount from './AddAccount';
const Account = (props) => {
    let history = useHistory();
    const handleChange = (accountId) => {
        props.updateAccount(accountId)
        setTimeout(() => {
            history.push('/');
        })
    }
    const fetchAccounts = () => {
        // Axios.get(`http://192.168.0.6:5000/getAccounts/${props.userId}`)
        // .then((response) => {
        //     console.log(response.data.accounts);
        //     if(response.data.flg === 1)
        //     {
        //         setAccounts(response.data.accounts);
        //     }
        //     else{
        //         props.showMessage('Internal Server Error. Please try again later',0);
        //     }
        // })
        // .catch((err) => {
        //     props.showMessage(`No Response from the Server. Err: ${err}`,0);
        // })
        fetch(`http://192.168.0.5:5000/getAccounts/${props.userId}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
    }
    const [accounts,setAccounts] = React.useState([]);
    const [form,setForm] = React.useState(false);
    React.useEffect(() => {
        fetchAccounts();
    },[])
    const Form = () => {
        setForm(false);
    }
    return (
        <div>
            {form && <AddAccount Form = {Form} userId = {props.userId} showMessage = {props.showMessage} fetchAccounts = {fetchAccounts}/>}
            <div>
                <h3>Who's Watching ?</h3>
                <div>
                    {accounts.map((account) => {
                        return (
                            <div key = {account.account_id} onClick = {() => handleChange(account.account_id)}>
                                <img src = 'https://cdn.dribbble.com/users/4558942/screenshots/13489935/media/75d7e767c135b359d8755ffb85e9604d.jpg?compress=1&resize=800x600' />
                                <h4>{account.account_name}</h4>
                            </div>
                        )
                    })}
                </div>
                {
                    accounts.length <= 4 ? 
                    <div>
                        <h5 onClick = {() => {setForm(true)}}><i className = 'fa fa-plus'></i></h5>
                    </div>
                    :
                    null
                }
               
            </div>
        </div>
    )
}
export default Account;