import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import AvatarIcon from '../Avtaar.webp'; // Adjust the path based on your project structure
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Tab, Nav, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, List, ListItem, ListItemText, DialogContentText } from '@material-ui/core';
import { Navbar, NavDropdown } from 'react-bootstrap';
import  {baseurl}  from "../api";

function Header() {
  // login
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // login
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/')
  };

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    const user = { email: loginEmail, password: loginPassword };

    try {
      const response = await axios.post(`${baseurl}/api/login`, user);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token); // Save the token in localStorage
        localStorage.setItem('userId', JSON.stringify(response.data)); // Save the user ID in localStorage

        Swal.fire({
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500
        });

        if (response.data.user.role === 'admin') {
          navigate('/admin');
        } else if (response.data.user.role === 'society') {
          navigate('/society/list');
        } else if (response.data.user.role === 'developer') {
          navigate('/user/tender');
        }

        setShow(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Login failed",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: error.message,
        showConfirmButton: true
      });
    }
  };

  // register

  const handleRegister = async (event) => {
    event.preventDefault();

    const user = { name, email, password, role: "developer" };

    try {
      const response = await axios.post(`${baseurl}/api/register`, user);
      //console.log(response, 'res');
      if (response.status === 200) {
        Swal.fire({
          // position: "top-end",
          icon: "success",
          title: "sucessfully Registered",
          showConfirmButton: false,
          timer: 1500
        });
        setShow(false); // Close the modal
        setName(''); // Clear the name field
        setEmail(''); // Clear the email field
        setPassword('')
        return
      }


      if (response.status === 201) {
        Swal.fire({
          // position: "top-end",
          icon: "error",
          title: "already register",
          showConfirmButton: false,
          timer: 1500
        });
        return
      }

    } catch (error) {

      Swal.fire({
        // position: "top-end",
        icon: "error",
        title: "unable to register user",
        showConfirmButton: false,
        timer: 1500
      });
      console.error(error);
    }
  };

  const AvatarIcon = () => <img src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-380-456332.png" alt="Avatar" style={{ height: '20px' }} />;

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

  const moveTonext = () => {
    navigate('/user/tender');
  }
  const moveTohome = () => {
    navigate('/');
  }
  // api for me
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);


  const me = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await axios.get(`${baseurl}/api/me`, {
        headers: {
          Authorization: `${token}`
        }
      });
      setUser(response.data.user)
      if (!response.data.user.phone) {
        setOpenDialog(true);
      }
    }

  }

  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  }

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await axios.put(`${baseurl}/api/admin/user/update/${user._id}`, {
        phone: phoneNumber
      }, {
        headers: {
          Authorization: `${token}`
        }
      });
      if (response.status === 200) {
        setUser(response.data.user);
        Swal.fire({
          // position: "top-end",
          icon: "success",
          title: "updated phone number",
          showConfirmButton: false,
          timer: 1500
        });
        setOpenDialog(false);
        
      }
    }
  }


  //my accunt modal
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose2 = () => {
    setOpen(false);
  };
  useEffect(() => { me() }, [])

  return (

    <>
      <header>
        <Navbar expand="lg" className="header-area header-style-one px-md-5">
          <Navbar.Brand href="#">
            {/* <img src="" alt="Vivek Bhole" /> */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="hamburger d-block d-xl-none">
            <span className="h-top" />
            <span className="h-middle" />
            <span className="h-bottom" />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
            <Nav className="mx-lg-auto">
              <Nav.Link style={{ cursor: 'pointer', fontSize: "20px", fontWeight: "500", color: "white" }} onClick={moveTohome}>Tender</Nav.Link>
              {localStorage.getItem('token') && (
                <>
                  <Nav.Link style={{ cursor: 'pointer', fontSize: "20px", fontWeight: "500", color: "white" }} onClick={handleClickOpen}>My Account</Nav.Link>
                </>
              )}
              {!localStorage.getItem('token') && (
                <>
                  <Nav.Link style={{ cursor: 'pointer', fontSize: "20px", fontWeight: "500", color: "white" }} onClick={handleShow}>Login</Nav.Link>
                </>
              )}
              {localStorage.getItem('token') &&
                <NavDropdown title={<AvatarIcon />} id="basic-nav-dropdown" >
                  <NavDropdown.Item onClick={handleLogout} style={{ color: 'red' }}>Logout</NavDropdown.Item>
                  <NavDropdown.Item onClick={moveTonext} style={{ color: 'green' }}>Tender Details</NavDropdown.Item>
                </NavDropdown>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>

      <Modal show={show} onHide={() => setIsOpen(false)}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Submit A Bid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tab.Container defaultActiveKey="login">
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link eventKey="login">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="register">Register</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="register">
                <Form onSubmit={handleRegister}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />                  </Form.Group>
                  <Button variant="primary" type="submit" >
                    Register
                  </Button>
                </Form>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Modal.Body>
      </Modal>
      {/*  */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">My Account</DialogTitle>
        <DialogContent>
          {user && (
            <>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>phone:{user.phone}</p>
              <p>{user.role}</p>
              {/* Display other user data as needed */}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* dialoo yo phone number */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update Phone Number</DialogTitle>
        <DialogContent>
          <DialogContentText>
            It seems like you haven't updated your phone number yet. Please update it.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone Number"
            type="phone"
            fullWidth
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>

  )

}

export default Header