import React from 'react';
import BattleArea from './../components/BattleArea';
import Stats from './../components/Stats';
import './../css/App.css';


function App() {
  return (
    <div className="App">
      <div className="Border">
        <BattleArea />
      </div>

      <div className="Statistics">
        <Stats />
      </div>
    </div>
  );
}

export default App;
