import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/public/Header';

import '../../pages/public/public.css';

const PublicLayout = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    )
}

export default PublicLayout;