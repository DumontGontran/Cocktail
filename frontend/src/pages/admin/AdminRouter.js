import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AdminLayout } from 'src/pages/admin';
import Error from 'src/_utils/Error';
import { User, UserEdit } from 'src/pages/admin/user';
import { Cocktail, CocktailAdd, CocktailEdit } from 'src/pages/admin/cocktail';

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