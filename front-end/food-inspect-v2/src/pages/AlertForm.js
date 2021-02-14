import { Form, Button, Container, Row, Col, Navbar, FormControl, Nav } from 'react-bootstrap'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";

function AlertForm() {
  return (
    <div>

          <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="#home">Infusion</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/data-view">View Data</Nav.Link>
                <Nav.Link href="/alerts-form">Alert/Notifications</Nav.Link>
              </Nav>
            </Navbar>

            <br />      

      <Container>
        <Row>
        <Col></Col>
        <Col><h1>Sign up to receive alerts / notifications</h1></Col>
        <Col></Col>
        </Row>
        <Row>
        <Col></Col>
        <Col>
        
        <Form>

          <Form.Group controlId="formBasicPassword">
              <Form.Label>First Name</Form.Label>
              <Form.Control placeholder="" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
              <Form.Label>Last Name</Form.Label>
              <Form.Control placeholder="" />
          </Form.Group>    

          <Form.Group controlId="formBasicPassword">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control placeholder="" />
          </Form.Group>    

          <Form.Group controlId="formBasicPassword">
              <Form.Label>City</Form.Label>
              <Form.Control placeholder="" />
          </Form.Group>   

          <Form.Group controlId="formBasicPassword">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control placeholder="" />
          </Form.Group>            

          <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
              </Form.Text>
          </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>            

        </Col>
        <Col></Col>
        </Row>        
      </Container>      



    
    </div>
  );
}

export default withRouter(AlertForm);