import React from 'react';
import logo from '../../assets/logo.png';
import './Header.css';
import { Container, Nav, NavDropdown, Navbar, Form, Button, Offcanvas } from 'react-bootstrap';


const Header = () => {
  return (
    <header className='Header'>
      {/* <img src={logo} alt="logo" className='logo' /> */}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="#home">
                <img
                  alt=""
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{' '}
                StackOverFlower
              </Navbar.Brand>
            </Container>
          </Navbar>



          <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>

              <Navbar.Collapse id="navbarScroll">

                <Form className="d-flex" >
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-1 custom-search"
                    aria-label="Search"
                  />

                  <Button variant="outline-success">Search</Button>
                </Form>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>










        </Container>
      </Navbar>



    </header>
  );
}

export default Header;
