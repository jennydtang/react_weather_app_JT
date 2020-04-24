import React, { Component } from "react";
import Moment from "moment";
import "moment-timezone";
import "./App.css";

class App extends React.Component {
  //create a function for time
  updateTime = () => {
    //set interval inside time function
    setInterval(() => {
      const now = Moment()
        .utcOffset(this.state.timezone / 60) //divide by 60 to convert min to hrs
        .format("MMMM Do YYYY, h:mm a");
      this.setState({
        time: now,
      });
    }, 1000);
  };

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
        ",us&appidus&units=imperial&appid=" +
        process.env.REACT_APP_API_KEY
    )
      //create a callback
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          temperature: data.main.temp,
          city: data.name,
          description: data.weather[0].description,
          timezone: data.timezone,
        });
        this.updateTime();
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
        <p id="clock">{this.state.time}</p>
      </div>
    );
  }
}

export default App;
