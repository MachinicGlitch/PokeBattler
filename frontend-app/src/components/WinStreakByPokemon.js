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

  async componentDidMount() {
    await axios
      .get("http://localhost:3306/battles/top10BestStreaks")
      .then((res) => {
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
      scaleFontColor: "white",
      type: "bar",
      data: {
        //Bring in data
        labels: this.state.labels,
        datasets: [
          {
            label: "Lead Pokemon: " + this.state.labels[0],
            data: this.state.data,
            backgroundColor: [
              "#FCC201",
              "#D8D8D8",
              "#CD7F32",
              "#FF0000",
              "#FF7F00",
              "#FFFF00",
              "#00FF00",
              "#0000FF",
              "#4B0082",
              "#9400D3",
            ],
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontColor: "white",
            fontSize: 14,
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "white",
                fontSize: 14,
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: "white",
                fontSize: 14,
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
