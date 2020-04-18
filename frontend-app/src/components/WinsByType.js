import React, { Component } from "react";
import Chart from "chart.js";
import axios from "axios";

class WinsByType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      data: [],
      colors: []
    };
  }

  chartRef = React.createRef();

  async componentDidMount() {
    await axios.get("http://localhost:3306/typeWins").then((res) => {
      this.setState(
        res.data.map((row) => {
          console.log(row);
          this.state.labels.push(row.type);
          this.state.data.push(row.wins);
          this.state.colors.push(row.hexcode);
        })
      );
    });
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "doughnut",
      data: {
        //Bring in data
        labels: this.state.labels,
        datasets: [
          {
            label: "Wins by Type",
            data: this.state.data,
            backgroundColor: this.state.colors
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

export default WinsByType;
