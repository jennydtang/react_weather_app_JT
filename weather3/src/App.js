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
    weatherImage: undefined,
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
          weatherImage: data.weather[0].main,
          iconURL:
            "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
        });
        this.updatePhoto();
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
  //weatherImage function
  updatePhoto = () => {
    let weatherImage = this.state.weatherImage;
    if (weatherImage === "Clouds") {
      this.setState({
        weatherImage:
          "https://i.pinimg.com/originals/2f/3e/52/2f3e520f1b0465388d85732e6b2367a6.gif",
      });
    } else if (
      weatherImage === "Rain" ||
      weatherImage === "Thunderstorm" ||
      weatherImage === "Drizzle"
    ) {
      this.setState({
        weatherImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSPM24KcFqfqmaEoT47VM4Xo5mIanOyYET-lapgraLZUL38i4zL&usqp=CAU",
      });
    } else if (weatherImage === "Clear") {
      this.setState({
        weatherImage:
          "https://res.cloudinary.com/fleetnation/image/private/c_fit,w_1120/g_south,l_text:style_gothic2:%C2%A9%20Stockimo,o_20,y_10/g_center,l_watermark4,o_25,y_50/v1481902395/ryft0wwrfktaohsn2zbj.jpg",
      });
    } else if (weatherImage === "Snow") {
      this.setState({
        weatherImage: "https://data.whicdn.com/images/88369426/original.jpg",
      });
    }
  };

  //render the items to the page
  render() {
    return (
      <div className="container">
        <h3>What's the weather like?</h3>
        <div className="container2">
          <p>Enter Your Zipcode Below:</p>
          <input type="text" id="inputZip" placeholder="zipcode"></input>
          <button onClick={this.updateWeather}>Click me</button>
          <p>{this.state.city}</p>
          <p>{this.state.temperature} °F</p>

          <img src={this.state.iconURL} alt=""></img>
          <p>{this.state.description}</p>
        </div>
        <p id="clock">{this.state.time}</p>
        <img className="pic" src={this.state.weatherImage} alt=""></img>
      </div>
    );
  }
}

export default App;
