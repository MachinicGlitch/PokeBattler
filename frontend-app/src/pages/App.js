import React from 'react';
import BattleArea from './../components/BattleArea';
import Stats from './../components/Stats';
import './../css/App.css';
import TrainerBlue from '../assets/BluePlayerTrainer.png';
import TrainerRed from '../assets/RedPlayerTrainer.png';
import Puff from '../assets/Jigglypuff.png';
import Explosion from '../assets/explosion.gif';


function App() {
  return (
    <div className="App">
      <div className="Border">
        <BattleArea />
        <p>
         <b>Pokemon Battle Simulator</b> <br/>
         <div align="left">
           <div align="right">
           <img src={Explosion} alt="Explosion that happens when a pokeball is opened"></img>
             <img src={TrainerRed} alt="Red Trainer Sprite" hspace="0"  vspace="0" width="400" height="400"></img>
             
           </div>
           
           <img src={TrainerBlue} alt="Blue Trainer Sprite" hspace="30" align="top" width="250" height="230"></img>
           <img src={Explosion} alt="Explosion that happens when a pokeball is opened" hspace="30"></img>
         </div>
        </p>
      </div>
      <div className="Statistics">
        <Stats />
      </div>
      
        
      

    </div>
  );
}

export default App;
