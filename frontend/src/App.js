import 'src/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicRouter from 'src/pages/public/PublicRouter';
import AdminRouter from 'src/pages/admin/AdminRouter';
import AuthRouter from 'src/pages/auth/AuthRouter';
import AuthGuard from 'src/_helpers/AuthGuard';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<PublicRouter />} />
          <Route path='/admin/*' element={
            <AuthGuard>
              <AdminRouter />
            </AuthGuard>
          } />
          <Route path='/auth/*' element={<AuthRouter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
