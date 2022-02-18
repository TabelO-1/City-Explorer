import axios from "axios";
import React from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import Weather from "./weather";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      location: {},
      showError: false,
      errorMessage: "",
      errorType: "",
      errorType1: "",
      weatherArr: [],
    };
  }
  handleChange = (event) => {
    let inputCity = event.target.value;
    console.log(inputCity);
    this.setState({ city: inputCity });
  };
  getlocation = async (event) => {
    event.preventDefault();
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`;
    try {
      let reponse = await axios.get(url);
      console.log("Reponse: ", reponse.data[0]);
      this.setState({
        location: reponse.data[0],
      });
      this.getWeather();
    } catch (error) {
      this.setState({
        showError: true,
        errorMessage: error.response.status + ": " + error.response.data.error,
        errorType: error.response.status,
      });
    }
  };

  getWeather = async () => {
    const url = `${process.env.REACT_APP_SERVER}/weather?lat=${this.state.location.lat}&lon=${this.state.location.lon}&searchQuery=${this.state.city}`;
    console.log(url);
    try {
      let response = await axios.get(url);
      console.log("Weather response: ", response.data);
      this.setState({
        weatherArr: response.data,
      });
    } catch (error) {
      let errorResponse = await axios.get(url);
      console.log(errorResponse);
      this.setState({
        showError: true,
        errorMessage: error.response.status + ": " + error.response.data.error,
      });
    }
  };
  render() {
    return (
      <div className="App">
        <h1 id="App-header">City Explorer</h1>
        <form onSubmit={this.getlocation} id="formId">
          Your City:<input name="input" onChange={this.handleChange}></input>
          <button id="exploreButton" type="submit">
            Explore!
          </button>
        </form>
        {this.state.location.display_name && (
          <Container id="containerId">
            <h3>Here's the map for: {this.state.location.display_name}</h3>
            <p>
              Lat/Long: {this.state.location.lat}/{this.state.location.lon}
            </p>
            <Image
              id="mapImg"
              roundedCircle
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=12`}
              alt="Image load failed."
            />
            <Weather weatherArr={this.state.weatherArr} />
          </Container>
        )}
        {this.state.showError && (
          <Alert id="errorId" variant="danger">
            {this.state.errorMessage}
            <Image src={`https://http.cat/[${this.state.errorType}]`} />
          </Alert>
        )}
      </div>
    );
  }
}

export default App;
