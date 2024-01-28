import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Error from 'src/_utils/Error';
import { Login, Register } from 'src/pages/auth';
import { PublicLayout } from 'src/pages/public';

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