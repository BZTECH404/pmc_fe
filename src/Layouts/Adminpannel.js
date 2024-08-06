import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Navbar, Nav } from 'react-bootstrap';

function AdminPanel() {
  const [formState, setFormState] = useState({
    name: '',
    amd: '',
    description: '',
    value: '',
    doc: '',
    role: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(formState);
    // Here you can handle the form submission, e.g., send the data to the server
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Redirect user to login page or update state to reflect logout
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#login">Login</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="6">
            <Form onSubmit={handleSubmit} className="my-form">
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" value={formState.name} onChange={handleChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label>AMD</Form.Label>
                <Form.Control name="amd" type="number" value={formState.amd} onChange={handleChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control name="description" as="textarea" rows={3} value={formState.description} onChange={handleChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Value</Form.Label>
                <Form.Control name="value" type="number" value={formState.value} onChange={handleChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Document</Form.Label>
                <Form.Control name="doc" value={formState.doc} onChange={handleChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Role</Form.Label>
                <Form.Control as="select" name="role" value={formState.role} onChange={handleChange}>
                  <option value="">Select...</option>
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control name="startDate" type="date" value={formState.startDate} onChange={handleChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control name="endDate" type="date" value={formState.endDate} onChange={handleChange} />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminPanel;