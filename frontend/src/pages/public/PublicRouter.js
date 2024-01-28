import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home, Service, PublicLayout } from 'src/pages/public';
import Error from 'src/_utils/Error';

const PublicRouter = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />

        <Route path='home' element={<Home />} />
        <Route path='service/:cid' element={<Service />} />

        <Route path='*' element={<Error />} />
      </Route>
    </Routes>
  )
}

export default PublicRouter;