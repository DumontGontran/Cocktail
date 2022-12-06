import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountService } from '../../_services';
import '../auth/auth.css';

const Login = () => {
    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: '', 
        password: ''
    });

    const updateCredentials = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    };

    const loginSubmit = (event) => {
        event.preventDefault();
        accountService.login(credentials)
        .then(res => {
            accountService.saveToken(res.data.access_token);
            navigate('/admin');
        })
        .catch(error => console.log(error))
    };

    return (
        <form className='Login' onSubmit={loginSubmit}>
            <h1>Connexion</h1>
            <div className='group'>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' autoComplete='current-email' value={credentials.email} onChange={updateCredentials} />
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