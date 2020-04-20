import React from "react";
import BattleArea from "./../components/BattleArea";
import GraphTabs from "./../components/GraphTabs";
import PokeBanner from "../components/PokeBanner";
import "./../css/App.css";

function App() {
  return (
    <div className="App">
      <div className="Banner">
        <PokeBanner />
      </div>
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
