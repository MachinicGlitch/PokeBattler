import React from 'react';
import axios from 'axios';
import LayeredImage from "react-layered-image";
import './../css/BattleArea.css';
import TrainerBlue from '../assets/BluePlayerTrainer.png';
import TrainerRed from '../assets/RedPlayerTrainer.png';
import Explosion from '../assets/explosion_noloop.gif';
import PokeBallTossRed from '../assets/pokeball_toss_red.gif';
import PokeBallTossBlue from '../assets/pokeball_toss_blue.gif';
import PokePlatform from '../assets/background.png';
import Transparent from '../assets/transparent.png';



function BattleArea() {

    let [startRendering, setStartRendering] = React.useState(false);
    let [winMessage, setWinMessage] = React.useState('Get Ready Trainers!');
    let [counter, setCounter] = React.useState(10);
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
        if( counter === 10 )
        {
            if( blueWins === null) {
                getPokemon(true);
                getPokemon(false);
                setStartRendering(true);
            }
            else if( blueWins )
                getPokemon(false);
            else
                getPokemon(true);
        }
        if( counter === 7)
            setWinMessage("Fight!")

        const timer = counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);

        if (counter === 0) {
            chooseWinner()
            setCounter(10)
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
        if (Math.random() < 0.5) {
            setBlueWins(true)
            setWinMessage( BluePokemon.name + " Wins!")
        }
        else {
            setBlueWins(false)
            setWinMessage( RedPokemon.name + " Wins!")
        }
    }

/* NOT BEING USED -- get it to work with layers

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
*/
    const style = {
        position: "absolute",
        top: 400, 
        right: 700,
        bottom: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      };
      const style2 = {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 100,
        left: 600,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      };

      var BluePokemonSpriteBack = (Number) (BluePokemon.id);
      var RedPokemonSpriteFront = (Number) (RedPokemon.id);

      function test()
      {
          return Explosion
      }
        
const layers = [
   PokePlatform, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/"+BluePokemonSpriteBack+".png",test()
];
const layers2 = [
    PokePlatform, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+RedPokemonSpriteFront+".png"
];
    return (
        <div className="MainField">
                <p> { winMessage } </p>
                <div align="left">
                    <div align="right">
                        
                        <img src={TrainerRed} alt="Red Trainer Sprite" hspace="0"  vspace="0" width="400" height="400" />
                        <div style={style2}>
                            <LayeredImage layers={layers2} style={{ width: 450 }} />
                        </div>
                    </div>
                    {
                    <img src={TrainerBlue} alt="Blue Trainer Sprite" hspace="30" vspace="0" align="top" width="250" height="230" />
                    
                    }
                    
                    <div style={style}>
                        <LayeredImage layers={layers} style={{ width: 450 }} />
                    </div>

                    {
                    <img src= {Transparent} width="250" height="250" />
                    }
                    
                </div>
            <p>Countdown: {counter}</p>
        </div>
    )
}

export default BattleArea;
// your table isnt updating on your website.