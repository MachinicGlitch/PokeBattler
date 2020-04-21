import React from "react";
import BattleArea from "./../components/BattleArea";
import GraphTabs from "./../components/GraphTabs";
import PokmonBattler from "../assets/PokmonBattler.png";
import "./../css/App.css";

function App() {
  return (
    <div className="App">
      <header className="Header">
        {" "}
        <img className="Logo" src={PokmonBattler} alt="PokmonBattler" />
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
