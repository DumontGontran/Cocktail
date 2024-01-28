import React from 'react';
import { Outlet } from 'react-router-dom';

import AdminHeader from 'src/components/admin/AdminHeader';
import SideMenu from 'src/components/admin/SideMenu';

import 'src/pages/admin/admin.css';
import 'src/components/admin/adminHeader.css';
import 'src/components/admin/sideMenu.css';

const AdminLayout = () => {
    return (
        <div className='AdminLayout'>
            <AdminHeader />
            <div id="admin">
                <SideMenu />
                <div id="admin_body"><Outlet /></div>
            </div>
        </div>
    )
}

export default AdminLayout;