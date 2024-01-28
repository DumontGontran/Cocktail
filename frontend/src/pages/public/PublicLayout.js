import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'src/components/public/Header';

import 'src/pages/public/public.css';

const PublicLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default PublicLayout;