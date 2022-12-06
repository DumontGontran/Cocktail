import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountService } from '../../_services/account.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const AdminHeader = () => {
    let navigate = useNavigate();
    const [over, setOver] = useState(false);

    const logout =() => {
        accountService.logout();
        navigate('/');
    };

    return (
        <div className='AdminHeader'>
            <h1>Panneau d'administration</h1>
            <button onClick={logout} onMouseOver={() => setOver(true)}
        onMouseLeave={() => setOver(false)}><FontAwesomeIcon icon={faRightFromBracket} size= 'lg' style={over ? { color: 'darkcyan' } : {}} /></button>
        </div>
    )
}

export default AdminHeader;