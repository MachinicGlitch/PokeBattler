import React, { Component } from 'react';
import Chart from 'chart.js'

class WinsByType extends Component {
    chartRef = React.createRef();
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "doughnut",
            data: {
                //Bring in data
                labels: ["Normal", "Fighting", "Grass","Poison","Fire","Flying","Water","Bug","Electric","Ground","Psychic","Rock","Ice","Ghost","Dragon"],
                datasets: [
                    {
                        label: "Wins by Type",
                        data: [24, 8, 14,33,12,19,32,12,9,14,14,11,5,3,3],
                        backgroundColor:[
                            "#A8A77A","#C22E28","#7AC74C","#A33EA1","#EE8130","#A98FF3","#6390F0","#A6B91A","#F7D02C","#E2BF65","#F95587","#B6A136","#96D9D6","#735797","#6F35FC"
                        ]
                    }
                ],
            },
            options: {
                //Customize chart options
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