import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Navbar from './components/navegation/Navbar'
import Inicio from './components/pages/Inicio'
import Shoppingcart from './components/pages/Shoppingcart'
import Help from './components/pages/Help'
import Error from './components/pages/Error'
import LoginButton from './components/Login'
import Profile from './components/Profile'

const App = () =>  {
  const {isAuthenticated} = useAuth0();
  
  return ( 
    <div className="App">
      {isAuthenticated ? (
        <>
        <Router>
        <Navbar/>
          <Routes>
            <Route path='/' exact Component={Inicio}/>
            <Route path='/Shoppingcart' Component={Shoppingcart}/>
            <Route path='/Help' Component={Help}/>
            <Route path='/Error' Component={Error}/>
            <Route path='/Profile' Component={Profile}/>
          </Routes> 
        </Router>
        </>
      ) : (
        <LoginButton />
      )}
      
    </div>
  );
}

export default App;
