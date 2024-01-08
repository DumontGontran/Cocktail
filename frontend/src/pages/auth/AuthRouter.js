import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Error from '../../_utils/Error';
import { Login, Register } from '../auth';
import { PublicLayout } from '../public';

const AuthRouter = () => {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route index element={<Login />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='*' element={<Error />} />
            </Route>
        </Routes>
    )
}

export default AuthRouter;