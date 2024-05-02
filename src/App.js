import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/navegation/Navbar'
import Inicio from './components/pages/Inicio'
import Shoppingcart from './components/pages/Shoppingcart'
import Help from './components/pages/Help'
import Error from './components/pages/Error'

const App = () =>  {
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
    </div>
  );
}

export default App;
