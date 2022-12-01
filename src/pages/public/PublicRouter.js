import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home, Service, Contact, Layout } from '../public';
import Error from '../../_utils/Error';

const PublicRouter = () => {
    return (
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />

            <Route path='/home' element={<Home />} />
            <Route path='/service' element={<Service />} />
            <Route path='/contact' element={<Contact />} />

            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
    )
}

export default PublicRouter;