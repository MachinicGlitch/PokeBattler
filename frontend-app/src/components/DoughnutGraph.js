import React, { Component } from "react";
import WinsByType from "./WinsByType.js";
import "../css/Stats.css";

class DoughnutGraph extends Component {
  render() {
    return (
      <div>
        <div className="doughnut">
          <WinsByType />
        </div>
      </div>
    );
  }
}
export default DoughnutGraph;
