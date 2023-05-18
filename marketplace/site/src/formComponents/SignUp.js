
import {useState} from 'react';

const SignUp = () => {
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('firstName=', firstName);

        // Post to endpoint
        const payload = { firstName: firstName, lastName: lastName, username: username, password: password, email: email };
        const res = await fetch('http://localhost:3001/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
          })
        
        const data = await res.json();
        console.log("response for sign up =", data);

        if (res.ok) {
            console.log('Sign up successful');
        }
        else if (res.status === 409) {
            console.log('Username already exists');
            setErrorMessage(data.message);
        }
        else{
            console.log('Signup failed with status code: ', res.status);
        }
    } 

    

    return (
        <div className='sign-up-form-container'>
            <h2>Sign Up </h2>
            <form className='sign-up-form' action='/signup' method='POST' onSubmit={handleSubmit}>
                <div className= 'form-control'>
                    <label>First Name</label>
                    <input 
                        type='text' 
                        placeholder='First Name' 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className= 'form-control'>
                    <label>Last Name</label>
                    <input 
                        type='text' 
                        placeholder='Last Name' 
                        value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className= 'form-control'>
                    <label>Username</label>
                    <input 
                        type='text' 
                        placeholder='Username' 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className= 'form-control'>
                    <label>Password</label>
                    <input 
                        type='text' 
                        placeholder='Password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className= 'form-control'>
                    <label>Email</label>
                    <input 
                        type='text' 
                        placeholder='Email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} />
                </div>

                <input 
                    type='submit' 
                    value='Submit'/>

            </form>
        </div>
    )
}

export default SignUp