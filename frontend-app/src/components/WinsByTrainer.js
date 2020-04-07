import React, { Component } from 'react';
import Chart from 'chart.js'

class WinsByTrainer extends Component {
    chartRef = React.createRef();
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "pie",
            data: {
                //Bring in data
                labels: ["Blue", "Red"],
                datasets: [
                    {
                        label: "Total Wins",
                        data: [2342, 2189],
                        backgroundColor: [
                            "#236B8E",
                            "#EE6363"
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
export default WinsByTrainer;