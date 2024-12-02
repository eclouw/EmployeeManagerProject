import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';

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
            <h1>Please Log In</h1>
        <form>
            <label><p>Username</p>
            <input type="text" onChange={e => setUserName(e.target.value)}/></label>
            <label><p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)}/></label>
            <div>
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </form>
        </div>
    )
}

export default Login;