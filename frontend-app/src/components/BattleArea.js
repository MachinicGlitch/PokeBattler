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
import winBall from '../assets/winPoke.png';
import blankBall from '../assets/losePoke.png';




function BattleArea() {
    let [winMessage, setWinMessage] = React.useState('Get Ready Trainers!');
    let [counter, setCounter] = React.useState(10);
    let [numBlueWins, setNumBlueWins] = React.useState(0);
    let [numRedWins, setNumRedWins] = React.useState(0);
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
                getPokemon(true);// get blue pokemon
                getPokemon(false);// get red pokemon
            }
            else if( numBlueWins === 3 ) {// blue pokeball counter
                setWinMessage("Blue Wins!")
                setNumBlueWins(0);
                setNumRedWins(0);
                getPokemon(true);
                getPokemon(false);
            }
            else if( numRedWins === 3 ) {// red pokeball counter
                setWinMessage("Red Wins!")
                setNumBlueWins(0);
                setNumRedWins(0);
                getPokemon(true);
                getPokemon(false);
            } 
            else if( blueWins )
                getPokemon(false);
            else if( !blueWins )
                getPokemon(true);
        }

        if( counter === 7) {
            setWinMessage("Fight!")
        }

        if (counter === 0) {
            chooseWinner()
            setCounter(10)
        }

        const timer = counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    const getPokemon = ( isBlue ) => {
        axios.get( "http://localhost:3306/pokemon/" + (Math.floor(Math.random() * 151) + 1) )
            .then(res => {
                const data = res.data;
                console.log(data.name);


                //This is for times chosen: the chart we are using is not being used right now
                // let paramsBattle = new URLSearchParams();
                // paramsBattle.append('id', data.id);
                // axios.post( "http://localhost:3306/battles/updateTimesChosen", paramsBattle );
                // if( data.types.length === 1)
                // {
                //     let paramsType = new URLSearchParams();
                //     paramsType.append('type', data.data.types[0].type.name);
                //     axios.post( "http://localhost:3306/types/updateTimesChosen", paramsType );
                // }
                // else 
                // {
                //     let paramsType1 = new URLSearchParams();
                //     paramsType1.append('type', data.data.types[0].type.name);
                //     axios.post( "http://localhost:3306/types/updateTimesChosen", paramsType1 );

                //     let paramsType2 = new URLSearchParams();
                //     paramsType2.append('type', data.data.types[1].type.name);
                //     axios.post( "http://localhost:3306/types/updateTimesChosen", paramsType2 );
                // }

                if( isBlue ) {
                    if( data.types.length === 1)
                        setBluePokemon({
                            id: data.id,
                            name: data.name,
                            front_default: data.sprites['front_default'],
                            back_default: data.sprites['back_default'],
                            PrimaryType: data.types[0].type.name,
                            SecondaryType: null
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
                            SecondaryType: null
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
        // IF blue wins
        if (Math.random() < 0.5) { 
            setBlueWins(true)
            setWinMessage("Blue's " + capitalize(BluePokemon.name) + " Wins!")
            setNumBlueWins(numBlueWins+1)
            
            // let paramsTrainer = new URLSearchParams(); // Update trainers wins
            // paramsTrainer.append('trainer', "blue");
            // axios.post( "http://localhost:3306/trainers/update", paramsTrainer );

            // let paramsBattleWin = new URLSearchParams(); // update blue pokemon id wins
            // paramsBattleWin.append('id', BluePokemon.id);
            // axios.post( "http://localhost:3306/battle/updateWins", paramsBattleWin );

            // let paramsBattleLoss = new URLSearchParams(); // update red pokemon id loss
            // paramsBattleLoss.append('id', RedPokemon.id);
            // axios.post( "http://localhost:3306/battle/updateLosses", paramsBattleLoss );

            // let paramsBlueType1 = new URLSearchParams(); // Update primary type wins
            // paramsBlueType1.append('type', BluePokemon.PrimaryType);
            // axios.post( "http://localhost:3306/types/updateWins", paramsBlueType1 );

            // if( BluePokemon.SecondaryType != null )
            // {
            //     let paramsType2 = new URLSearchParams(); // Update secondary type name
            //     paramsType2.append('type', BluePokemon.SecondaryType);
            //     axios.post( "http://localhost:3306/types/updateWins", paramsType2 );
            // }

            // let paramsRedType1 = new URLSearchParams(); // Update primary type wins
            // paramsRedType1.append('type', RedPokemon.PrimaryType);
            // axios.post( "http://localhost:3306/types/updateLosses", paramsRedType1 );

            // if( RedPokemon.SecondaryType != null ) 
            // {
            //     let paramsType2 = new URLSearchParams(); // Update secondary type wins
            //     paramsType2.append('type', RedPokemon.SecondaryType);
            //     axios.post( "http://localhost:3306/types/updateLosses", paramsType2 );
            // }

        }//END IF blue wins
        
        else { // red wins
            setBlueWins(false)
            setWinMessage("Red's " + capitalize(RedPokemon.name) + " Wins!")
            setNumRedWins(numRedWins+1)

            let paramsTrainer = new URLSearchParams(); // Update trainers wins
            paramsTrainer.append('trainer', "red");
            axios.post( "http://localhost:3306/trainers/update", paramsTrainer );

            // let paramsBattleWin = new URLSearchParams(); // update red pokemon id wins
            // paramsBattleWin.append('id', RedPokemon.id);
            // axios.post( "http://localhost:3306/battle/updateWins", paramsBattleWin );

            // let paramsBattleLoss = new URLSearchParams(); // update blue pokemon id loss
            // paramsBattleLoss.append('id', BluePokemon.id);
            // axios.post( "http://localhost:3306/battle/updateLosses", paramsBattleLoss );

            let paramsRedType1 = new URLSearchParams(); // Update primary type
            paramsRedType1.append('type', RedPokemon.PrimaryType);
            axios.post( "http://localhost:3306/types/updateWins", paramsRedType1 );

            // if( RedPokemon.SecondaryType != null )
            // {
            //     let paramsType2 = new URLSearchParams(); // Update secondary type
            //     paramsType2.append('type', RedPokemon.SecondaryType);
            //     axios.post( "http://localhost:3306/types/updateWins", paramsType2 );
            // }

            // let paramsBlueType1 = new URLSearchParams(); //update primary type win
            // paramsBlueType1.append('type', BluePokemon.PrimaryType);
            // axios.post( "http://localhost:3306/types/updateLosses", paramsBlueType1 );

            // if( BluePokemon.SecondaryType != null )
            // {
            //     let paramsType2 = new URLSearchParams(); // Update secondary type wins
            //     paramsType2.append('type', BluePokemon.SecondaryType);
            //     axios.post( "http://localhost:3306/types/updateLosses", paramsType2 );
            // }
        }
    }

    const showPokeballs = ( isBlue ) => {
        if( isBlue ) {
            if(numBlueWins === 0) {
                return (
                    <div className="BluePokeWins">
                        <img src={blankBall} alt="Blank match counter Pokeball"></img>
                        <img src={blankBall} alt="Blank match counter Pokeball"></img>
                        <img src={blankBall} alt="Blank match counter Pokeball"></img>
                    </div>
                )
            }
            else if(numBlueWins === 1) {
                return (
                    <div className="BluePokeWins">
                        <img src={winBall} alt="Win match counter Pokeball"></img>
                        <img src={blankBall} alt="Blank match counter Pokeball"></img>
                        <img src={blankBall} alt="Blank match counter Pokeball"></img>
                    </div>
                )
            }
            else if(numBlueWins === 2) {
                return (
                    <div className="BluePokeWins">
                        <img src={winBall} alt="Win match counter Pokeball"></img>
                        <img src={winBall} alt="Win match counter Pokeball"></img>
                        <img src={blankBall} alt="Blank match counter Pokeball"></img>
                    </div>
                )
            }
            else {
                return (
                    <div className="BluePokeWins">
                        <img src={winBall} alt="Win match counter Pokeball"></img>
                        <img src={winBall} alt="Win match counter Pokeball"></img>
                        <img src={winBall} alt="Win match counter Pokeball"></img>
                    </div>
                )
            }
        }
        else {
            if(numRedWins === 0) {
                return (
                    <div className="RedPokeWins">
                        <img src={blankBall} alt="Blank match counter Pokeball"></img>
                        <img src={blankBall} alt="Blank match counter Pokeball"></img>
                        <img src={blankBall} alt="Blank match counter Pokeball"></img>
                    </div>
                )
            }
            else if(numRedWins === 1) {
                return (
                    <div className="RedPokeWins">
                        <img src={winBall} alt="Win match counter Pokeball"></img>
                        <img src={blankBall} alt="Blank match counter Pokeball"></img>
                        <img src={blankBall} alt="Blank match counter Pokeball"></img>
                    </div>
                )
            }
            else if(numRedWins === 2) {
                return (
                    <div className="RedPokeWins">
                        <img src={winBall} alt="Win match counter Pokeball"></img>
                        <img src={winBall} alt="Win match counter Pokeball"></img>
                        <img src={blankBall} alt="Blank match counter Pokeball"></img>
                    </div>
                )
            }
            else {
                return (
                    <div className="RedPokeWins">
                        <img src={winBall} alt="Win match counter Pokeball"></img>
                        <img src={winBall} alt="Win match counter Pokeball"></img>
                        <img src={winBall} alt="Win match counter Pokeball"></img>
                    </div>
                )
            }
        }
    }

    const capitalize = ( s ) => {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

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


        
const layers = [
   PokePlatform, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/"+BluePokemonSpriteBack+".png",PokeBallTossBlue
];
const layers2 = [
    PokePlatform, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+RedPokemonSpriteFront+".png",PokeBallTossRed
];
    return (
        <div className="MainField">
                <p> { winMessage } </p>
                {showPokeballs(true)}
                {showPokeballs(false)}
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