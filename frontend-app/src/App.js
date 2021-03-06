import React from "react";
import BattleArea from "./components/BattleArea";
import GraphTabs from "./components/GraphTabs";
import PokmonBattler from "./assets/PokmonBattler.png";
import OPSongRemix from './assets/pokeBattlerMusic.mp3';


function App() {
  return (
    <div className="App">
      <header className="Header">
       
        <img className="Logo" src={PokmonBattler} alt="PokmonBattler" />
        <audio controls className="audio" loop>
            <source src={OPSongRemix} type="audio/mpeg"></source>
        </audio>
      </header>
      <div className="Border">
        <BattleArea />
      </div>
      <div className="GraphTabs">
        <GraphTabs />
      </div>
    </div>
  );
}

export default App;
