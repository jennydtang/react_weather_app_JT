import React, { Component } from "react";
import "./App.css";

// console.log(process.env.REACT_APP_GOOGLE_API_KEY);

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    description: undefined,
  };

  //create a function to get the data
  updateWeather = () => {
    //define zipcode
    const zip = document.getElementById("inputZip").value;
    //create fetch
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?zip=" +
        zip +
        ",us&appid=b278274f83cd4f81b715ce235212c73c"
    )
      //create a callback
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          temperature: data.main.temp,
          city: data.name,
          description: data.weather[0].description,
        });
      })
      .catch((err) => {
        console.log("Not a valid Zipcode!");
      });
  };

  //create a handler
  handleClick() {
    this.updateWeather();
  }

  //render the items to the page
  render() {
    return (
      <div>
        <input type="text" id="inputZip" placeholder="zipcode"></input>
        <button onClick={this.updateWeather}>Click me</button>
        <p>{this.state.temperature}</p>
        <p>{this.state.city}</p>
        <p>{this.state.description}</p>
      </div>
    );
  }
}

export default App;
