import React, { Component } from "react";
import Chart from "chart.js";
import axios from "axios";

class WinStreakByPokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      data: [],
    };
  }
  chartRef = React.createRef();
  componentDidMount() {
    axios.get("http://localhost:3306/battles/top10BestStreaks").then((res) => {
      this.setState(
        res.data.map((row) => {
          console.log(row);
          this.state.labels.push(row.name);
          this.state.data.push(row.best_streak);
        })
      );
    });
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "bar",
      data: {
        //Bring in data
        labels: this.state.labels,
        datasets: [
          {
            label: "Win Streak by Pokemon",
            data: this.state.data,
            backgroundColor: [
              "#A98FF3",
              "#A98FF3",
              "#C22E28",
              "#6390F0",
              "#B6A136",
              "#A33EA1",
              "#735797",
              "#C22E28",
              "#A33EA1",
              "#A33EA1",
            ],
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  render() {
    return <div>{<canvas id="myChart" ref={this.chartRef} />}</div>;
  }
}
export default WinStreakByPokemon;
