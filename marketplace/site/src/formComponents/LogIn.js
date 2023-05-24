import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {username: username, password: password};
        console.log("sending", username, password);

        try{
            const res = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)

            })

            const data = await res.json();
            console.log('response:', data);

            // redirect to Homepage if successful login
            if ( data.message === "Login Success") {
                navigate('/');
            } 
            else{
                console.log(data.message);
            }
            
        }
        catch {
            console.error('Error:', 'Api Error Occurred');
        }
        
    }

  return (

    <div className='login-page-container'>
        <h2>Login Page</h2>
         <form className='login-form' action='/login' method='POST' onSubmit={handleSubmit}>
            <div className='form-control'>
                <label>Username</label>
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input
                    type='text'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <input 
            type='submit' 
             value='Login'/>
        </form>
        
    </div>
  )
}

export default LogIn