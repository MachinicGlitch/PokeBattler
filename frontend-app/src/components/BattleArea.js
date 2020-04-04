import React from 'react';
import axios from 'axios';
import TrainerBlue from '../assets/BluePlayerTrainer.png';
import TrainerRed from '../assets/RedPlayerTrainer.png';
import Explosion from '../assets/explosion_noloop.gif';
import PokeBallTossRed from '../assets/pokeball_toss_red.gif';
import PokeBallTossBlue from '../assets/pokeball_toss_blue.gif';



function BattleArea() {

    let [startRendering, setStartRendering] = React.useState(false);
    let [counter, setCounter] = React.useState(5);
    let [blueWins, setBlueWins] = React.useState(null);     // null = start of loading, true = blue wins, false = red wins
    let [BluePokemon, setBluePokemon] = React.useState({
         id: '',
         name: '',
         front_default: '',
         back_default: '',
         PrimaryType: '',
         SecondaryType: ''
        });
    let [RedPokemon, setRedPokemon] = React.useState({
        id: '',
        name: '',
        front_default: '',
        back_default: '',
        PrimaryType: '',
        SecondaryType: ''
       });


    React.useEffect(() => {
        if( counter === 5 )
        {
            if( blueWins === null) {
                getPokemon(true);
                getPokemon(false);
                console.log("BLUE: " + BluePokemon.back_default);
                console.log("RED: " + RedPokemon.front_default);
                setStartRendering(true);
            }
            else if( blueWins )
                getPokemon(false);
            else
                getPokemon(true);

            
        }

        const timer = counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);

        if (counter === 0) {
            chooseWinner()
            setCounter(5)
        }
    }, [counter]);


    const getPokemon = ( isBlue ) => {
        axios.get( "http://localhost:8080/pokemon/" + (Math.floor(Math.random() * 151) + 1) )
            .then(res => {
                const data = res.data;
                console.log(data.name);

                if( isBlue ) {
                    if( data.types.length === 1)
                        setBluePokemon({
                            id: data.id,
                            name: data.name,
                            front_default: data.sprites['front_default'],
                            back_default: data.sprites['back_default'],
                            PrimaryType: data.types[0].type.name,
                            SecondaryType: 'null'
                        });
                    else 
                        setBluePokemon({
                            id: data.id,
                            name: data.name,
                            front_default: data.sprites['front_default'],
                            back_default: data.sprites['back_default'],
                            PrimaryType: data.types[0].type.name,
                            SecondaryType: data.types[1].type.name
                        });
                }
                else {
                    if( data.types.length === 1)
                        setRedPokemon({
                            id: data.id,
                            name: data.name,
                            front_default: data.sprites['front_default'],
                            back_default: data.sprites['back_default'],
                            PrimaryType: data.types[0].type.name,
                            SecondaryType: 'null'
                        });
                    else 
                        setRedPokemon({
                            id: data.id,
                            name: data.name,
                            front_default: data.sprites['front_default'],
                            back_default: data.sprites['back_default'],
                            PrimaryType: data.types[0].type.name,
                            SecondaryType: data.types[1].type.name
                        });
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }




    const chooseWinner = () => {
        if (Math.random() < 0.5)
            setBlueWins(true)
        else
            setBlueWins(false)
    }


    const showDeathAnimation = () => {
        return(
            <img src={Explosion} alt="Explosion that happens when a pokemon faints for "  ></img>
        )
    }

    const showSummonAnimationRed = () => {
        return(
            <img src= {PokeBallTossRed} alt="Animation that plays when a pokemon is summoned from red "></img>
        )
    }

    const showSummonAnimationBlue = () => {
        return(
            <img src= {PokeBallTossBlue} alt="Animation that plays when a pokemon is summoned from blue "></img>
        )
    }


    return (
        <div>
            <p>
                <p> { blueWins ? "Blue Wins!" : "Red Wins!" } </p>
                <div align="left">
                    <div align="right">
                        { startRendering ? <img src={RedPokemon.front_default} /> : "" }
                        <img src={TrainerRed} alt="Red Trainer Sprite" hspace="0"  vspace="0" width="400" height="400" />
                    </div>
                    <img src={TrainerBlue} alt="Blue Trainer Sprite" hspace="30" vspace="14" align="top" width="250" height="230" />
                    {startRendering ? <img src={BluePokemon.back_default} /> : ""}
                </div>
            </p>

            <p>Countdown: {counter}</p>
            <p>RED: {/*RedPokemon.name*/}</p>
            <p>BLUE: {/*BluePokemon.name*/}</p>
        </div>
    )
}



export default BattleArea;