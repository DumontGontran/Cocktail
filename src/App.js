import './App.css';
import Home from './pages/Home';
import Service from './pages/Service';
import Contact from './pages/Contact';
import Error from './_utils/Error';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          
          <Route path='/home' element={<Home/>}/>
          <Route path='/service' element={<Service/>}/>
          <Route path='/contact' element={<Contact/>}/>

          <Route path='*' element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
