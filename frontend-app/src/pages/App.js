import React from 'react';
import BattleArea from './../components/BattleArea';
import Stats from './../components/Stats';
import './../css/App.css';
import TrainerBlue from '../assets/BluePlayerTrainer.png';
import TrainerRed from '../assets/RedPlayerTrainer.png';
import Puff from '../assets/Jigglypuff.png';


function App() {
  return (
    <div className="App">
      <div className="Border">
        <BattleArea />
        <p>
         <b>Pokemon Battle Simulator</b> <br/>
         <div align="left">
           <div align="right">
             <img src={TrainerRed} alt="Blue Trainer Sprite" hspace="0" vspace="0" width="400" height="400"></img>
           </div>
          
           <img src={TrainerBlue} alt="Red Trainer Sprite" hspace="30" width="250" height="230"></img>
           
         </div>
        </p>
      </div>
      <div className="Trainers">
      </div>
     

      <div className="Statistics">
        <Stats />
      </div>


    </div>
  );
}

export default App;
