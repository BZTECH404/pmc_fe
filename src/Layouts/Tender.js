import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { Modal, Tab, Nav, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseurl } from "../api";
function Tender() {
  // 
  const navigate = useNavigate();


  // 
  const [data, setData] = useState([]);

  const [id, setId] = useState(null);
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async (event) => {
    event.preventDefault();

    const user = { email: loginEmail, password: loginPassword };

    try {
      // const history = useHistory();

      const response = await axios.post(`${baseurl}/api/login`, user);
      console.log(response, 'res');
      if (response.status === 200) {
        console.log(response.data)
        localStorage.setItem('token', response.data.user.token); // Save the token in localStorage
        localStorage.setItem('userId', JSON.stringify(response.data)); // Save the user ID in localStorage
        
        if (response.data.user.role === 'admin') {
          navigate('/admin');
          return
        }
        if (response.data.user.role === 'developer') {
          navigate('/tender-details');
          return
        }
        Swal.fire({
          icon: "success",
          title: "Login success",
          showConfirmButton: false,
          timer: 1500
        });
        setShow(false);


        // Redirect to the tender details page
        // window.location.href = '/tender-details/' + response.data.tenderId;
      } else {
        // Handle login failure
        Swal.fire({
          icon: "error",
          title: "Login failed",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.error(error);
    }
  };


  const [showDetails, setShowDetails] = useState(false);
  const handleCloseDetails = () => setShowDetails(false);
  const handleDetails = async (item_id) => {
    //console.log(item_id);
    setId(item_id);

    navigate(`/tender-details/${item_id}`);
    //   // Get the tender ID and user ID
    //   const tenderId = item._id;
    //   const userId = /* Your code to get the user ID from localStorage */;

    //   // Call the API
    //   try {
    //     const response = await axios.get(`${baseurl}/api/details?userId=${userId}&tenderId=${tenderId}`);
    //     //console.log(response.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // } else {
    //   // Your existing code to show the login/register modal
    // }
  }

  const [file, setFile] = useState(null);
  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  //console.log(file, 'file');
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

      if (response.status === 401) {
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
  // 
  const handleSubmit = async (event) => {
    try {
      // //console.log(event.target);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', id);
      formData.append('usertender', JSON.parse(localStorage.getItem('userId')).user._id);

      for (let pair of formData.entries()) {
        //console.log(pair[0] + ', ' + pair[1]);
      }
      try {
        const response = await axios.post(`${baseurl}/api/tenderapply`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.status === 200) {
          Swal.fire({
            // position: "top-end",
            icon: "success",
            title: "sucessfully applied ,wait for admin approval",
            showConfirmButton: false,
            timer: 1500
          });
          setShowDetails(false);
          return
        }
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  }
  // 
  const [previousData, setPreviousData] = useState([]);

  useEffect(() => {
    axios.get(`${baseurl}/api/gettender`)
      .then(response => {
        const now = new Date();
        const activeTenders = response.data.tenders.filter(tender => new Date(tender.endDate) > now);

        const previousTenders = response.data.tenders.filter(tender => new Date(tender.endDate) <= now);
        setPreviousData(previousTenders);
        // //console.log(activeTenders,'s')
        setData(activeTenders);
        // //console.log(response.data.tenders)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  // 
  const ResponsiveDiv = styled.div`
  color: black;

  @media (max-width: 768px) {
    color: red;
  }
  @media (max-width: 768px) {
  .auction-wrapper {
    padding-top: 50px;
  }

  .table-responsive {
    overflow-x: scroll;
  }

  .pagination-style-one {
    margin-top: 20px;
  }

  .modal {
    width: 100%;
  }
  .mobile-search .container .row {
      display: flex;
      justify-content: center;
      align-items: center;
    }
}
  `;

  // Define the styles
  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 0',
  };

  const buttonStyle = {
    backgroundColor: '#f8f9fa',
    border: 'none',
    color: '#343a40',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    margin: '0 10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#343a40',
    color: '#f8f9fa',
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <ResponsiveDiv>
      <ToastContainer />
      <>
        {/* <div className="preloader">
          <div className="loader">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div> */}
        <div className="mobile-search">
          <div className="container">
            <div className="row">
              <div className="col-11">
                <label>What are you lookking for?</label>
                <input type="text" placeholder="Search Products, Category, Brand" />
              </div>
              <div className="col-1 d-flex justify-content-end align-items-center">
                <div className="search-cross-btn">
                  <i className="bi bi-x" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Header />
        <div className="breadcrumb breadcrumb-style-one">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-8  text-center">
                <h1 className="breadcrumb-title"
                  style={{
                    fontSize: window.innerWidth <= 576 ? '45px' : 'initial',
                    textAlign: window.innerWidth <= 576 ? 'center' : 'left',
                    fontWeight: 900,
                    letterSpacing: '0.02em',
                    textTransform: 'capitalize',
                    color: '#fff',
                    fontSize: "40px",
                    fontFamily: 'nunito, sans-serif',
                    paddingBottom: '6px'
                  }}>
                  Vivek Bhole Architects Private Limited
                </h1>
                <h2 className="mt-3"
                  style={{
                    fontSize: window.innerWidth <= 576 ? '20px' : 'initial',
                    textAlign: window.innerWidth <= 576 ? 'center' : 'left',
                    letterSpacing: '0.02em',
                    textTransform: 'capitalize',
                    color: '#fff',
                    fontSize: ":25px",
                    fontFamily: 'nunito, sans-serif',
                    paddingBottom: '6px'

                  }}>
                  Project Management Consultancy Division
                </h2>
              </div>
            </div>
          </div>
        </div>


        <hr />
        {/* auction */}
        <div className="auction-wrapper pt-110">
          <div className="container">
            <a href='https://drive.google.com/drive/folders/19vDyDPZGrMp3npbVuEaotTXvK5lZD91i' style={{ fontWeight: "bold", fontSize: "20px", textDecoration: "underline " }} target='_blank'>How to use</a>
            <hr />
            <div className="table-responsive">
              <table className="table table-striped table-hover table-responsive">

                <thead className="thead-dark">
                  <tr>
                    <th>Name</th>
                    <th>CTS Number</th>
                    {/* <th>Image</th> */}
                    <th>location</th>
                    {/* <th>EMD</th> */}
                    {/* <th>Tender Value</th> */}
                    <th>End Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems && currentItems.map(item => (
                    <tr key={item._id}>
                      <td><a className="text-danger font-weight-bold">{item.title}</a></td>
                      <td>{item.cts_number}</td>
                      {/* <td><img src={item.doc} alt="" className="img-fluid" /></td> */}
                      {/* <td>{item.description}</td> */}
                      <td>{item.State}</td>
                      {/* <td className="text-primary font-weight-bold">{item.tender_value}</td> */}
                      <td>{item.endDate}</td>
                      <td>
                        {/* {localStorage.getItem('token') ?
                      <a className="btn btn-primary font-weight-bold" onClick={handleDetails}>See Details</a> :
                      <a className="btn btn-primary font-weight-bold" onClick={handleShow}>Submit A Bid</a>
                    } */}
                        {/* {localStorage.getItem('token') ? */}
                        {/* <a className="btn btn-primary font-weight-bold" onClick={() => handleDetails(item._id)}>See Details</a> : */}
                        <a className="btn btn-primary font-weight-bold" onClick={() => handleDetails(item._id)}>View Details</a>
                        {/* } */}
                      </td>
                      {/* <td><a className="btn btn-primary font-weight-bold" onClick={handleShow}>    {localStorage.getItem('token') ? 'See Details' : 'Submit A Bid'}</a></td> */}
                    </tr>
                  ))}
                </tbody>
              </table>


            </div>
            {/* pagination */}
            <div style={paginationStyle}>
              {Array(Math.ceil(data.length / itemsPerPage)).fill().map((_, index) => (
                <button
                  style={currentPage === index + 1 ? activeButtonStyle : buttonStyle}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            {/*    */}

            <h3 style={{ textAlign: "center" }}>Former Tenders</h3>
            <br />
            <table className="table table-striped table-hover table-responsive">

              <thead className="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>CTS Number</th>
                  <th>location</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {previousData && previousData.map(item => (
                  <tr key={item._id}>
                    <td><a className="text-danger font-weight-bold">{item.title}</a></td>
                    <td>{item.cts_number}</td>
                    <td>{item.State}</td>
                    <td>{item.endDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
        {/*  */}
        <Footer />
        {/* login modal */}
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
        {/* bootstrap */}
        <Modal show={showDetails} onHide={handleCloseDetails}>
          <Modal.Header closeButton>
            <Modal.Title>Account Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Modal.Body>
              <p>Account Number: XXXX</p>
              <p>IFSC Code: XXXX</p>
              <p>Bank Name: XXXX</p>
              <p>Branch: XXXX</p>
              <input type="file" onChange={handleFileUpload} />
              <button onClick={handleSubmit}>Submit</button>
            </Modal.Body>
          </Modal.Body>
        </Modal>
      </>
    </ResponsiveDiv>
  )
}

export default Tender