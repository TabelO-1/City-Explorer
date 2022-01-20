import axios from "axios";
import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
    };
  }
  handleChange = (event) => {
    let inputCity = event.target.value;
    console.log(inputCity);
    this.setState({ city: inputCity });
  };
  getlocation = async (event) => {
    event.preventDefault();
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`
    let reponse = await axios.get(url);
    console.log('Reponse: ', reponse.data[0]);
    this.setState({
      location: reponse.data[0]
    }) 
  };
  render() {
    return (
      <div className="App">
        <h1>City Explorer</h1>
        <form onSubmit={this.getlocation}>
          Your City:<input name="input" onChange={this.handleChange}></input>
          <button type="submit">Explore!</button>
        </form>
        <h3>Here's the map for: {this.state.city}</h3>
      </div>
    );
  }
}

export default App;
