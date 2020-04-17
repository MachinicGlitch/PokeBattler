import React, { Component } from "react";
import Chart from "chart.js";
import axios from "axios";

class WinsByTrainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      data: [],
    };
  }
  chartRef = React.createRef();
  componentDidMount() {
    axios.get("http://localhost:3306/trainers").then((res) => {
      this.setState(
        res.data.map((row) => {
          console.log(row);
          this.state.labels.push(row.trainer);
          this.state.data.push(row.wins);
        })
      );
    });
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "pie",
      data: {
        //Bring in data
        labels: this.state.labels,
        datasets: [
          {
            label: "Total Wins",
            data: this.state.data,
            backgroundColor: ["#236B8E", "#EE6363"],
          },
        ],
      },
      options: {},
    });
  }
  render() {
    return <div>{<canvas id="myChart" ref={this.chartRef} />}</div>;
  }
}
export default WinsByTrainer;
