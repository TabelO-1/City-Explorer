import React from 'react';
import { Card, Col } from "react-bootstrap";

class WeatherDay extends React.Component {
  render() {
    return (
        <Col key={this.props.idx} id="center">
          <Card className="forecast" id={`card${this.props.idx}`}>
            <Card.Text>Date: {this.props.day.day}</Card.Text>
            <Card.Text>Forecast: {this.props.day.description}</Card.Text>
          </Card>
        </Col>
    );
  }
}

export default WeatherDay;