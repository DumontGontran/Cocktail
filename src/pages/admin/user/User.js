import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { userService } from '../../../_services';

import '../user/user.css';

const User = () => {
    const [users, updateUsers] = useState([]);
    const flags = useRef(false);

    useEffect(() => {
        if(flags.current === false) {
        userService.getAllUsers()
            .then(res => {
                updateUsers(res.data.data);
            })
            .catch(error => console.log(error))
        }

        return () => flags.current = true;
    }, []);

    const delUser = (userId) => {
        userService.deleteUser(userId)
        .then(res => {
            console.log(res);
            updateUsers((current) => current.filter(user => user.id !== userId));
        })
        .catch(error => console.log(error))
    };

    return (
        <div className='User'>
            <h1>Liste des utilisateurs</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Date de création</th>
                        <th>Édition</th>
                        <th>Suppression</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.nom}</td>
                                <td>{user.prenom}</td>
                                <td>{user.email}</td>
                                <td>{user.createdAt.split('T')[0].split('-').reverse().join('-')}</td>
                                <td><Link to={`../edit/${user.id}`}><FontAwesomeIcon icon={faUserEdit} size='lg' className='userEditIcon' /></Link></td>
                                <td><span onClick={() => delUser(user.id)}><FontAwesomeIcon icon={faUserSlash} size='lg' className='userDeleteIcon' /></span></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default User;