import React from 'react';
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Legend from '../resources/UpdatedLegend.png'
import CardComponent from '../components/CardComponent'
import axios from 'axios'
import data from '../resources/data'

const divStyle = {
  backgroundColor: '#CAE9FF'
};

const imageStyle = {
  display: "flex", justifyContent: "center", alignItems: "center"
}

class DataListView extends React.Component {
    constructor(props) {
      super(props);
      this.state = { items: data };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    async getFoodInspectionData(){
            
      try{
        const response = await axios.get('http://localhost:5000/food-api/food-inspection-data');
        const items = response.data;
        items.forEach( (item) => {
          this.state.items.push(item)
        })

      }catch(error){
        console.log(error)
        alert('There was an error getting api data')
      }
    }



    async componentDidMount() {
      // await this.getFoodInspectionData();

      this.state.items.forEach( (item) => {
        console.log(item.businessName)
      })
    }
  
    render() {
      return (
        <div>

          <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="#home">Infusion</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/data-view">View Data</Nav.Link>
                <Nav.Link href="/alerts-form">Alert/Notifications</Nav.Link>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Enter zipcode" className="mr-sm-2" />
                <Button variant="outline-light">Search</Button>
              </Form>
            </Navbar>

            <br />

            <Container>
              <Row>
                <Col sm={12} >
                  <div style={imageStyle} >
                    <img src={Legend}  alt="logo" /> 
                  </div>
                </Col>                
              </Row>

              {/* <Row>
                <Col sm={12} style={divStyle}>

                  {[1,2,3].map(item => (
                    <CardComponent/>
                  ))}

                </Col>
              </Row> */}

            <Row xs={1} md={3}>
              

              { this.state.items.map( (item) => (
                <Col>
                    <CardComponent CardTitle={item.businessName} RiskColor={item.riskColor} Risk={item.risk} CardText={item.address} />                  
                </Col>
              ))}


            </Row>

          </Container>            


        </div>
      );
    }
  
    handleChange(e) {
      this.setState({ text: e.target.value });
    }
  
    handleSubmit(e) {
      e.preventDefault();
      if (this.state.text.length === 0) {
        return;
      }
      const newItem = {
        text: this.state.text,
        id: Date.now()
      };
      this.setState(state => ({
        items: state.items.concat(newItem),
        text: ''
      }));
    }
}

export default withRouter(DataListView);
