
import {React,useState} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Badge } from 'react-bootstrap';
import {Link,useNavigate} from 'react-router-dom'
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
function Header() {
    let data=useCart()

    const [cartView,setCartView]=useState(false)
    const navigate=useNavigate()
    const handleLogout=()=>{
localStorage.removeItem("authToken")
navigate('/login')
    }
  return (
    <div>
    <Navbar bg="success" variant="dark" expand="lg" >
    <Container>
      <Navbar.Brand className='fs-1 fst-italic' href="/">OrderBite</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto ">
        <Link to={'/'} className="text-decoration-none"><Nav.Link  className='fs-5 text-decoration-none'>Home</Nav.Link></Link>
        {(localStorage.getItem("authToken"))?
        <Link to={'/myOrder'} className="text-decoration-none"><Nav.Link href="#home" className='fs-5'>My orders</Nav.Link></Link>

    :""}
      </Nav>
      <Nav className="ml-auto">
      {(!localStorage.getItem("authToken"))?

      <div className='d-flex'>
        <Link to={'/login'} className="text-decoration-none " ><Nav.Link href="#features" className='btn bg-light text-dark mx-1'>Login</Nav.Link></Link>
        <Link to={'/createUser'} className="text-decoration-none" ><Nav.Link href="#features" className='btn bg-light text-dark   mx-1'>Sign up</Nav.Link></Link>
        </div>
        :
        <div>
        <div className='btn bg-white  mx-2' style={{color:'black'}} onClick={()=>setCartView(true)}>My cart{" "}
        <Badge pill bg='dark'>{data.length}</Badge>
        </div>
{cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
    <div className='btn bg-white mx-2'style={{color:'black'}} onClick={handleLogout}>Logout</div>
    </div>
    }
        </Nav>
        </Navbar.Collapse>
    </Container>
  </Navbar>
  

    
    </div>
  )
}

export default Header