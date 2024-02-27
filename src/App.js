import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/navegation/Navbar'
import Inicio from './components/pages/Inicio'
import Shoppingcart from './components/pages/Shoppingcart'
import Help from './components/pages/Help'
import Error from './components/pages/Error'
import React, { useEffect } from 'react'

const App = () =>  {
  const [deferredPrompt, setDeferredPrompt] = React.useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
      });
    }
  };
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' exact Component={Inicio}/>
          <Route path='/Shoppingcart' Component={Shoppingcart}/>
          <Route path='/Help' Component={Help}/>
          <Route path='/Error' Component={Error}/> 
        </Routes>
      </Router>
      <button onClick={handleInstall}>Instalar PWA</button>
    </div>
  );
}

export default App;
