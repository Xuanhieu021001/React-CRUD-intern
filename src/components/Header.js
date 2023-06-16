import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';


const Header = (props)=>{
  const{logout,user} = useContext(UserContext)
  console.log(user);
  const navigate = useNavigate()
  const handleLogout=()=>{
    logout();
    navigate('/');
    toast.success('Đăng xuất thành công!')
  }
    return(
        <>
        <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">My App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {(user && user.auth|| window.location.pathname==='/')&&
          <>
            <Nav className="me-auto">
            <NavLink to="/" className='nav-link'>Home</NavLink>
            <NavLink to="/users" className='nav-link'>Manage users</NavLink>
            </Nav>
            <Nav> 
              {user&& user.email&& <span className='nav-link'>Well come: {user.email}</span>}
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  {user&& user.auth === true?<NavLink onClick={()=>handleLogout()} className='dropdown-item'>Logout</NavLink>
                  : <NavLink to="/login" className='dropdown-item'>Login</NavLink>
                  }
                  {/* <NavDropdown.Divider /> */}
                  
                </NavDropdown>
            </Nav>
          </>
          }
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </>
    )
}

export default Header