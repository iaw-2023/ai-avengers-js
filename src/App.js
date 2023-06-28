import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/navegation/Navbar'
import Inicio from './components/pages/Inicio'
import Shoppingcart from './components/Shoppingcart'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' exact Component={Inicio}/>
          <Route path='/Shoppingcart' Component={Shoppingcart}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
