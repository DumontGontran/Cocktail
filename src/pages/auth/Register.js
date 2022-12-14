import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userService } from '../../_services';

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        nom: '',
        prenom: '',
        pseudo: '',
        email: '',
        password: ''
    });

    const createUser = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    const userCreateSubmit = (event) => {
        event.preventDefault();
        userService.addUser(user)
        .then(res => {
            console.log(res);
            navigate('../login');
        })
        .catch(error => console.log(error))
    };

    return (
        <div className='UserAdd'>
             <form className='User' onSubmit={userCreateSubmit}>
            <h1>Ajouter un utilisateur</h1>
            <div className='group'>
                <label htmlFor='nom'>Nom</label>
                <input type='text' name='nom' autoComplete='current-nom' value={user.nom} onChange={createUser} />
            </div>
            <div className='group'>
                <label htmlFor='prenom'>Prénom</label>
                <input type='text' name='prenom' autoComplete='current-prenom' value={user.prenom} onChange={createUser} />
            </div>
            <div className='group'>
                <label htmlFor='pseudo'>Pseudo</label>
                <input type='text' name='pseudo' autoComplete='current-pseudo' value={user.pseudo} onChange={createUser} />
            </div>
            <div className='group'>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' autoComplete='current-email' value={user.email} onChange={createUser} />
            </div>
            <div className='group'>
                <label htmlFor='password'>Mot de passe</label>
                <input type='password' name='password' autoComplete='current-password' value={user.password} onChange={createUser} />
            </div>
            <div className='group'>
                <button>Ajouter</button>
                <Link to='/auth/login'>Se connecter en cliquant ici</Link>
            </div>
        </form>
        </div>
    )
}

export default Register;