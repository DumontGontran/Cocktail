import React from 'react';
import { useParams } from 'react-router-dom';

const UserEdit = () => {
    let {uid} = useParams();
    console.log('uid', uid);

    return (
        <div className='UserEdit'>
            Éditer Utilisateurs
        </div>
    )
}

export default UserEdit;