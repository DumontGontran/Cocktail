import React, { useState } from 'react';
import '../auth/auth.css';

const Login = () => {
    const [credentials, setCredentials] = useState({
        login: '', password: ''
    });

    const updateCredentials = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    };

    const loginSubmit = (event) => {
        event.preventDefault();
        console.log('DATA =>', credentials);
    };

    return (
        <form className='Login' onSubmit={loginSubmit}>
            <h1>Connexion</h1>
            <div className='group'>
                <label htmlFor='login'>Identifiant</label>
                <input type='text' name='login' autoComplete='current-user' value={credentials.login} onChange={updateCredentials} />
            </div>
            <div className='group'>
                <label htmlFor='password'>Mot de passe</label>
                <input type='password' name='password' autoComplete='current-password' value={credentials.password} onChange={updateCredentials} />
            </div>
            <div className='group'>
                <button>Se connecter</button>
            </div>
        </form>
    )
}

export default Login;