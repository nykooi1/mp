import { useState } from "react"


const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {username: username, password: password};
        const res = await fetch('http://localhost:3001/login', {
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
        <h2>Login</h2>
        <form className='login-form'>
            <div className='form-control'>
                <label>Username</label>
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
            </div>
        </form>
    </div>
  )
}

export default Login