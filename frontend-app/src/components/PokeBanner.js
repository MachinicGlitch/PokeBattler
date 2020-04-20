import React, {Component} from "react";
import axios from "axios";
import Banner from "../../node_modules/react-js-banner/build";
import './../css/PokeBanner.css'

class PokeBanner extends Component {
  render() {
    return(
      <div>
      <Banner className="Banner" title="Welcome to the Pokemon Battle Simulator" showBanner="true"/>
  </div>
    );
  }
}
export default PokeBanner;
