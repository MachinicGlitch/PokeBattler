import React, { Component } from "react";
import WinsByTrainer from "./WinsByTrainer.js";
import "../css/Stats.css";
class PieGraph extends Component {
  render() {
    return (
      <div>
        <div className="pie">
          <WinsByTrainer />
        </div>
      </div>
    );
  }
}
export default PieGraph;
