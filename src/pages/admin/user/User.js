import React from 'react';
import { useNavigate } from 'react-router-dom';

const User = () => {
    let navigate = useNavigate();
    
    const getUserId = (userId) => {
        console.log('click');
        navigate('../edit/' + userId);
    };

    return (
        <div className='User'>
            Liste Utilisateurs
            <button onClick={() => getUserId(1)}>User 1</button>
        </div>
    )
}

export default User;