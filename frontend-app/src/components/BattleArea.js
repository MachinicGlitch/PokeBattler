import React from 'react';
import TrainerBlue from '../assets/BluePlayerTrainer.png';
import TrainerRed from '../assets/RedPlayerTrainer.png';
import Explosion from '../assets/explosion.gif';

function BattleArea() {
    let [counter, setCounter] = React.useState(5);
    let [winner, setWinner] = React.useState(null);

    const chooseWinner = () => {
        if (Math.random() < 0.5)
            setWinner(false)
        else
            setWinner(true)
    }

    React.useEffect(() => {
        const timer = counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);

        if (counter == 0) {
            chooseWinner()
            setCounter(5)
        }
    }, [counter]);

    return (
        <div>
            <p>
                <p> { winner ? "Blue Wins!" : "Red Wins!" } </p>
                <div align="left">
                    <div align="right">
                        <img src={Explosion} alt="Explosion that happens when a pokeball is opened"></img>
                        <img src={TrainerRed} alt="Red Trainer Sprite" hspace="0"  vspace="0" width="400" height="400"></img>
                    </div>
                    <img src={TrainerBlue} alt="Blue Trainer Sprite" hspace="30" align="top" width="250" height="230"></img>
                    <img src={Explosion} alt="Explosion that happens when a pokeball is opened" hspace="30"></img>
                </div>
            </p>

            <p>Countdown: {counter}</p>
        </div>
    )
}



export default BattleArea;