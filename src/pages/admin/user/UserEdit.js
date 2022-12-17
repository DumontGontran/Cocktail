import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '../../../_services';

import '../user/user.css';

const UserEdit = () => {
    let navigate = useNavigate();
    const [isLoad, setLoad] = useState(false);
    const flag = useRef(false);
    const { uid } = useParams();

    useEffect(() => {
        if (flag.current === false) {
            userService.getUser(uid)
                .then(res => {
                    setTimeout(() => {
                        setUser(res.data.data);
                        setLoad(true);
                    }, 1000)
                })
                .catch(error => console.log(error))
            }

            return () => flag.current = true;
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

    const [user, setUser] = useState({
        nom: '',
        prenom: '',
        pseudo: '',
        email: '',
        createdAt: ''
    });

    const [message, setMessage] = useState();

    const updateUser = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    const userEditSubmit = (event) => {
        event.preventDefault();
        userService.updateUser(user)
            .then(_res => {
                navigate('../index');
            })
            .catch(error => {
                setMessage(error.response.data.message)
            })
    };
    
    if (!isLoad) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='UserEdit'>
            <form className='User' onSubmit={userEditSubmit}>
                <h1>Édition de l'utilisateur</h1>
                <div className='group'>
                    <label htmlFor='nom'>Nom</label>
                    <input type='text' name='nom' autoComplete='current-nom' value={user.nom} onChange={updateUser} />
                </div>
                <div className='group'>
                    <label htmlFor='prenom'>Prénom</label>
                    <input type='text' name='prenom' autoComplete='current-prenom' value={user.prenom} onChange={updateUser} />
                </div>
                <div className='group'>
                    <label htmlFor='pseudo'>Pseudo</label>
                    <input type='text' name='pseudo' autoComplete='current-pseudo' value={user.pseudo} onChange={updateUser} />
                </div>
                <div className='group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' autoComplete='current-email' value={user.email} onChange={updateUser} />
                </div>
                <div className='group'>
                    <button>Modifier</button>
                    <p className='errorMessage'>{message}</p>
                </div>
            </form>
        </div>
    )
}

export default UserEdit;