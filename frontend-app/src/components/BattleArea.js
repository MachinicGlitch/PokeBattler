import React from 'react';
import Timer from './Timer'

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
            <p> { winner ? "Blue Wins!" : "Red Wins!" } </p>

            <p>Countdown: {counter}</p>
        </div>
    )
}



export default BattleArea;