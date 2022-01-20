import axios from "axios";
import React from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      location: {},
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
    let reponse = await axios.get(url);
    console.log("Reponse: ", reponse.data[0]);
    this.setState({
      location: reponse.data[0],
    });
  };
  render() {
    return (
      <div className="App">
        <h1>City Explorer</h1>
        <form onSubmit={this.getlocation}>
          Your City:<input name="input" onChange={this.handleChange}></input>
          <button type="submit">Explore!</button>
        </form>
        {this.state.location.display_name && 
          <Container>
            <h3>Here's the map for: {this.state.location.display_name}</h3>
            <p>Lat/Long: {this.state.location.lat}/{this.state.location.lon}</p>
            <Image/>
          </Container>
        }
      </div>
    );
  }
}

export default App;
