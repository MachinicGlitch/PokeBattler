import React, { Component } from 'react';
import Chart from 'chart.js'

class WinStreakByPokemon extends Component {
    chartRef = React.createRef();
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "bar",
            data: {
                //Bring in data
                        //flying    flying     fighting   water       poison    ghost     water        fighting   poison    psychic 
                labels: ["Dodrio", "Pidgeot", "Machamp", "Blastoise", "Arbok", "Haunter", "Kabutops", "Machoke", "Koffing", "Hypno"],
                datasets: [
                    {
                        label: "Win Streak by Pokemon",
                        data: [32, 30, 30, 29, 28, 28, 28, 27, 27, 26],
                        backgroundColor: [
                            "#A98FF3", "#A98FF3", "#C22E28", "#6390F0", "#A33EA1", "#735797", "#6390F0", "#C22E28","#A33EA1", "#F95587"
                        ]
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks:{beginAtZero: true}
                    }]
                }
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
export default WinStreakByPokemon;