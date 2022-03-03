import React from "react";
// import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Card from "react-bootstrap/Card";
import WeatherDay from "./WeatherDay";

class Weather extends React.Component {
  render() {
    return (
      <Row md={3}>
        {this.props.weatherArr.map((day, idx) => (
        <WeatherDay idx={idx} day={day} />
        ))}
      </Row>
    );
  }
}

export default Weather;
