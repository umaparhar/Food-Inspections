import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap'

class CardComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { seconds: 0 };
    }
  
    tick() {
      this.setState(state => ({
        seconds: state.seconds + 1
      }));
    }
  
    componentDidMount() {
      this.interval = setInterval(() => this.tick(), 1000);
    }
  
    componentWillUnmount() {
      clearInterval(this.interval);
    }
  
    render() {
      return (
        <div>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Name: {this.props.CardTitle}</Card.Title>
              <Card.Text>
                {this.props.CardText}
              </Card.Text>
            
                <h4>  
                  <Badge variant={this.props.RiskColor}> Risk: {this.props.Risk}</Badge>
                </h4>


              <Button variant="primary">Violations</Button>              
              <p></p>
              <Button variant="primary">Google Maps</Button>

            </Card.Body>
          </Card>            
        </div>
      );
    }
  }

export default CardComponent;
