import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';
import '../Components/UI/styles/styles.css'

//Attempt to log the user in
async function loginUser(details){
    try{
        const token = await axios.post(process.env.REACT_APP_BACKEND_URL + ':' + process.env.REACT_APP_BACKEND_PORT+'/login', details);
        return token.data;
    }catch(error){
        console.log(error);
    }
    
}

function Login({setToken}){
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    //When the user clicks the submit/login button
    const handleSubmit = async e=>{
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });

        
        if (token){
            setToken(token);
        }
        
    }

    return(
        <div className='login-page'>
            
        <form>
        <h1>Please Log In</h1>
            <p>Username
            <input type="text" onChange={e => setUserName(e.target.value)} style={{marginLeft: '1rem'}}/></p>
            <p>Password
            <input type="password" onChange={e => setPassword(e.target.value)} style={{marginLeft: '1rem'}}/></p>
            <div>
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </form>
        </div>
    )
}

export default Login;