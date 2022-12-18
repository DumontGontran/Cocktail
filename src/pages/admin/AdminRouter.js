import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AdminLayout } from '../admin';
import Error from '../../_utils/Error';
import { User, UserEdit } from '../admin/user';
import { Cocktail, CocktailAdd, CocktailEdit } from '../admin/cocktail';

const PublicRouter = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path='user'>
          <Route index path='index' element={<User />} />
          <Route path='edit/:uid' element={<UserEdit />} />
        </Route>

        <Route path='cocktail'>
          <Route path='index' element={<Cocktail />} />
          <Route path='add' element={<CocktailAdd />} />
          <Route path='edit/:cid' element={<CocktailEdit />} />
        </Route>

        <Route path='*' element={<Error />} />
      </Route>
    </Routes>
  )
}

export default PublicRouter;