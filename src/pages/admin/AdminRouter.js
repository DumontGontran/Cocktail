import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Dashboard, AdminLayout } from '../admin';
import Error from '../../_utils/Error';
import { User, UserAdd, UserEdit } from '../admin/user';
import { Cocktail, CocktailEdit } from '../admin/cocktail';

const PublicRouter = () => {
    return (
        <Routes>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='user'>
                <Route path='index' element={<User />} />
                <Route path='add' element={<UserAdd />} />
                <Route path='edit/:uid' element={<UserEdit />} />
            </Route>

            <Route path='cocktail'>
                <Route path='index' element={<Cocktail />} />
                <Route path='edit' element={<CocktailEdit />} />
            </Route>

            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
    )
}

export default PublicRouter;