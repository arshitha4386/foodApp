
import './App.css';
import Header from './components/Header';
import Home from './screens/Home';
import {Routes,Route} from 'react-router-dom'
import Login from './screens/Login';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import SignUp from './screens/SignUp';
import { CartProvider } from './components/ContextReducer';
import Cart from './screens/Cart';
import MyOrders from './screens/MyOrders';
function App() {
  return (
    <CartProvider>
    <div className="App">
    <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/createUser' element={<SignUp/>}></Route>
    <Route path='/myOrder' element={<MyOrders/>}></Route>



      </Routes>
    </div>
    </CartProvider>
  );
}

export default App;