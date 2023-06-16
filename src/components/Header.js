import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Header = (props)=>{
  const navigate = useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate('/')
    toast.success('Đăng xuất thành công!')
  }
    return(
        <>
        <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">My App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className='nav-link'>Home</NavLink>
            <NavLink to="/users" className='nav-link'>Manage users</NavLink>
          </Nav>
          <Nav>
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavLink to="/login" className='dropdown-item'>Login</NavLink>
                <NavDropdown.Divider />
                <NavLink onClick={()=>handleLogout()} className='dropdown-item'>Logout</NavLink>
              </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </>
    )
}

export default Header