import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = () => {
    return (
        <div className='SideMenu'>
            <ul>
                <li>
                    Utilisateurs
                    <ul>
                        <li><Link to='/admin/user/index'>Liste</Link></li>
                    </ul>
                </li>
                <li>
                    Cocktails
                    <ul>
                        <li><Link to='/admin/cocktail/index'>Liste</Link></li>
                        <li><Link to='/admin/cocktail/add'>Ajouter</Link></li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default SideMenu;