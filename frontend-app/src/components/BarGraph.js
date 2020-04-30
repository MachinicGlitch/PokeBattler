import React, { Component } from "react";
import WinStreakByPokemon from "./WinStreakByPokemon.js";
import "../css/Stats.css";

class BarGraph extends Component {
  render() {
    return (
      <div>
        <div className="bar">
          <WinStreakByPokemon />
        </div>
      </div>
    );
  }
}
export default BarGraph;
