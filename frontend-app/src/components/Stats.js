import React, { Component } from 'react';
import WinsByType from './WinsByType.js';
import WinStreakByPokemon from './WinStreakByPokemon.js'
import WinsByTrainer from './WinsByTrainer.js';
import '../css/Stats.css'
class Stats extends Component {
    render() {
        return (
            <div>
                <div className="doughnut"><WinsByType /></div>
                <div className="pie"><WinsByTrainer /></div>
                <div className="bar"><WinStreakByPokemon /></div>
            </div>
        )
    }
}

export default Stats;
