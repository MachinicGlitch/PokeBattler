import React from 'react';
import TrainerBlue from '../assets/BluePlayerTrainer.png';
import TrainerRed from '../assets/RedPlayerTrainer.png';
import Explosion from '../assets/explosion_noloop.gif';
import PokeBallTossRed from '../assets/pokeball_toss_red.gif';
import PokeBallTossBlue from '../assets/pokeball_toss_blue.gif';



function BattleArea() {


function showDeathAnimation()
{
    return(
        <img src={Explosion} alt="Explosion that happens when a pokemon faints for "  ></img>
    )

}
function showSummonAnimationRed()
{
    return(
        <img src= {PokeBallTossRed} alt="Animation that plays when a pokemon is summoned from red "></img>
    )

}
function showSummonAnimationBlue()
{
    return(
        <img src= {PokeBallTossBlue} alt="Animation that plays when a pokemon is summoned from blue "></img>
    )

}


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
                        
                        
                        <img src={TrainerRed} alt="Red Trainer Sprite" hspace="0"  vspace="0" width="400" height="400"></img>
                    </div>
                    <img src={TrainerBlue} alt="Blue Trainer Sprite" hspace="30" vspace="14" align="top" width="250" height="230"></img>
                    
                </div>
            </p>

            <p>Countdown: {counter}</p>
        </div>
    )
}



export default BattleArea;