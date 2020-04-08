import React, { Component } from 'react';
import Chart from 'chart.js'
import axios from 'axios';


class WinsByType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            data: []
        };
      }
    chartRef = React.createRef();
    componentDidMount() {
        axios.get( "http://localhost:3306/typeWins" )
        .then(res => {
          this.setState(
              res.data.map( row => {
                  console.log(row)
                  this.state.labels.push(row.type)
                  this.state.data.push(row.wins)
              })
          )
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
                        backgroundColor: [
                            "#6390F0","#A33EA1","#A8A77A","#EE8130","#A6B91A","#F95587","#E2BF65","#7AC74C","#A98FF3","#F7D02C","#E2BF65","#96D9D6","#C22E28","#6F35FC","#735797"
                        ]
                    }
                ],
            },
            options: {


            }
        });
    }

    render(){
        return (
            <div>
                {
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
                }
            </div>
        )
    }
}
export default WinsByType;