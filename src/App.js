import './App.css';
import { BrowserRouter } from 'react-router-dom';
import PublicRouter from '../src/pages/public/PublicRouter';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <PublicRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
