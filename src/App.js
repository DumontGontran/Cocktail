import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Service from './pages/Service';
import Contact from './pages/Contact';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Home/>
        <Service/>
        <Contact/>
      </header>
    </div>
  );
}

export default App;
