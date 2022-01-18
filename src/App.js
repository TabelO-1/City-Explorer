import React from 'react'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ''
    }
  }
  handleChange = (event) => {
    let inputCity = event.target.value;
    console.log(inputCity);
    this.setState({city: inputCity});
  }
  render() {
    return (
      <div className="App">
        <h1>City Explorer</h1>
          <form>
            Your City:<input name="input" onChange={this.handleChange}></input>
            <button>Explore!</button>
          </form>
        <h3>Here's the map for: {this.state.city}</h3>
      </div>
    )
  }
}

export default App;
