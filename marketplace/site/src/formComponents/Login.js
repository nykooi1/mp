import { useState } from "react"


const LogIn = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {username: username, password: password};
        const res = await fetch('http://localhost:3001/LogIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)

        })

        const data = await res.json()
        console.log('response:', data)
        
    }

  return (

    <div className='login-page-container'>
        <h2>Login Page</h2>
         <form className='login-form'>
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
                    onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <input 
            type='submit' 
             value='Login'/>
        </form>
        
    </div>
  )
}

export default LogIn