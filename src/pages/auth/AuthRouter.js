import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Error from '../../_utils/Error';
import Login from '../auth/Login';

const AuthRouter = () => {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route path='login' element={<Login />} />

            <Route path='*' element={<Error />} />
        </Routes>
    )
}

export default AuthRouter;