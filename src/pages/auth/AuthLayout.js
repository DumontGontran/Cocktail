import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/public/Header';

import '../../pages/public/public.css';
import '../auth/auth.css';

const AuthLayout = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    )
}

export default AuthLayout;