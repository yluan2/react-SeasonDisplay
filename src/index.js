import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
  //more js function, ini the state
  //create new instance, will be automatically and instantly called
  // jump to render as soon as state method, before the geolocation runs
  state = { lat: null, errorMsg: "" };

  //componentDidMount  -> only get invoke one time -> data loading

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errorMsg: err.message })
    );
  }
  //componentDidUpdate -> get called every single time  -> state/props change
  //componentWillUnmount -> do the cleanup (non-react stuff)

  renderContent() {
    if (this.state.errorMsg && !this.state.lat) {
      return <div>Error: {this.state.errorMsg}</div>;
    }

    if (!this.state.errorMsg && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return (
      <div>
        <Spinner message="Please accept location request" />
      </div>
    );
  }

  //have to define render
  //be called many times
  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
