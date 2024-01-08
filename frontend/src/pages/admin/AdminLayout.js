import React from 'react';
import { Outlet } from 'react-router-dom';

import AdminHeader from '../../components/admin/AdminHeader';
import SideMenu from '../../components/admin/SideMenu';

import '../admin/admin.css';
import '../../components/admin/adminHeader.css';
import '../../components/admin/sideMenu.css';

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