import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUserSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { userService, accountService } from 'src/_services';

import 'src/pages/admin/user/user.css';

const User = () => {
    const [users, updateUsers] = useState([]);
    const [isLoad, setLoad] = useState(false);
    const { id } = accountService.getTokenInfo();
    const navigate = useNavigate();
    const flags = useRef(false);

    useEffect(() => {
        if (flags.current === false) {
            userService.getAllUsers()
                .then(res => {
                    setTimeout(() => {
                        updateUsers(res.data.data);
                        setLoad(true);
                    }, 1500)
                })
                .catch(error => console.log(error))
        }

        return () => flags.current = true;
    }, []);

    const delUser = (userId) => {
        userService.deleteUser(userId)
            .then(res => {
                console.log(res);
                accountService.logout();
                navigate('../../../auth/register');
            })
            .catch(error => console.log(error))
    };

    if (!isLoad) {
        return <h1><FontAwesomeIcon icon={faSpinner} size='xl' className='spinnerIcon' /></h1>
    }

    return (
        <div className='User'>
            <h1>Liste des utilisateurs</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Date de création</th>


                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user.id}>
                                {user.id === id &&
                                    <>
                                        <td data-label='Nom'>{user.nom}</td>
                                        <td data-label='Prénom'>{user.prenom}</td>
                                        <td data-label='Email'>{user.email}</td>
                                        <td data-label='Date de création'>{user.createdAt.split('T')[0].split('-').reverse().join('-')}</td>
                                        <td>
                                            <Link to={`../edit/${user.id}`}><FontAwesomeIcon icon={faUserEdit} size='lg' className='userEditIcon' /></Link>
                                            <span onClick={() => delUser(user.id)}><FontAwesomeIcon icon={faUserSlash} size='lg' className='userDeleteIcon' /></span>
                                        </td>
                                    </>
                                }
                                {user.id !== id &&
                                    <>
                                        <td data-label='Nom'>{user.nom}</td>
                                        <td data-label='Prénom'>{user.prenom}</td>
                                        <td data-label='Email'>{user.email}</td>
                                        <td data-label='Date de création'>{user.createdAt.split('T')[0].split('-').reverse().join('-')}</td>

                                    </>
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default User;