import React from 'react';
import { Link } from 'react-router-dom';
import 'src/components/public/header.css'

const Header = () => {
    return (
        <header className='PublicHeader'>
            <nav>
                <ul>
                    <li><Link to='/home'>Accueil</Link></li>
                    <li><Link to='/admin/user/index'>Administration</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;