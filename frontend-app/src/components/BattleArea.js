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

    const BlueStyle = {
        position: "absolute",
        top: 400, 
        right: 700,
        bottom: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        };
    const RedStyle = {
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

    const BlueLayers = [
        PokePlatform, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/" + BluePokemonSpriteBack + ".png", PokeBallTossBlue
    ];
    const RedLayers = [
        PokePlatform, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + RedPokemonSpriteFront + ".png", PokeBallTossRed
    ];

    React.useEffect(() => {
        
        if( counter === 10 )
        {
            if( blueWins === null) {
                getPokemon(true);   // get blue pokemon
                getPokemon(false);  // get red pokemon
            }
            else if( numBlueWins === 3 ) {  // blue pokeball counter
                setWinMessage("Blue Wins!")
                let paramsTrainer = new URLSearchParams();      // Update blue trainer's wins
                paramsTrainer.append('trainer', "blue");
                axios.post( "http://localhost:3306/trainers/update", paramsTrainer );
            }     
            else if( numRedWins === 3 ) {   // red pokeball counter
                setWinMessage("Red Wins!")
                let paramsTrainer = new URLSearchParams();      // Update red trainer's wins
                paramsTrainer.append('trainer', "red");
                axios.post( "http://localhost:3306/trainers/update", paramsTrainer );
            }    
        }

        if( counter === 8 ) {
            if( blueWins === null ) {
                console.log("testing thing");
            }
            else if( numBlueWins === 3 ) {       // blue pokeball counter
                console.log("Blue wins match, resetting counters");
                setNumBlueWins(0);
                setNumRedWins(0);
                getPokemon(true);
                getPokemon(false);
            }
            else if( numRedWins === 3 ) {   // red pokeball counter
                console.log("Red wins match, resetting counters");
                setNumBlueWins(0);
                setNumRedWins(0);
                getPokemon(true);
                getPokemon(false);
            } 
            else if( blueWins ) {
                console.log("Blue wins round, resetting red pokemon");
                getPokemon(false);
            }
            else if( !blueWins ) {
                console.log("Red wins round, resetting blue pokemon");
                getPokemon(true);
            }
        } 

        if( counter === 7 ) {
            console.log("Setting fight message");
            setWinMessage("Fight!")
        }

        if (counter === 0) {
            console.log("End of round, choosing winner");
            chooseWinner()
            setCounter(10)
        }

        const timer = counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    const getPokemon = ( isBlue ) => {
        console.log("Start of get pokemon");
        axios.get( "http://localhost:3306/pokemon/" + (Math.floor(Math.random() * 151) + 1) )
            .then(res => {
                const data = res.data;

                // Update the pokemon's times chosen stat
                let paramsBattle = new URLSearchParams();
                paramsBattle.append('id', data.id);
                paramsBattle.append('name', data.name);
                axios.post( "http://localhost:3306/battles/updateTimesChosen", paramsBattle );

                // Update the pokemon's primary type times chosen stat
                let paramsType1 = new URLSearchParams();
                paramsType1.append('type', data.types[0].type.name);
                paramsType1.append('name', data.name);
                axios.post( "http://localhost:3306/types/updateTimesChosen", paramsType1 );

                // Update the pokemon's secondary type times chosen stat if present
                if( data.types.length === 2)
                {
                    let paramsType2 = new URLSearchParams();
                    paramsType2.append('type', data.types[1].type.name);
                    paramsType2.append('name', data.name);
                    axios.post( "http://localhost:3306/types/updateTimesChosen", paramsType2 );
                }

                
                if( isBlue ) {  // set blue pokemon if it is mono type
                    if( data.types.length === 1) 
                        setBluePokemon({
                            id: data.id,
                            name: data.name,
                            front_default: data.sprites['front_default'],
                            back_default: data.sprites['back_default'],
                            PrimaryType: data.types[0].type.name,
                            SecondaryType: "null"
                        });
                    else        // set blue pokemon if it is dual type
                        setBluePokemon({
                            id: data.id,
                            name: data.name,
                            front_default: data.sprites['front_default'],
                            back_default: data.sprites['back_default'],
                            PrimaryType: data.types[0].type.name,
                            SecondaryType: data.types[1].type.name
                        });
                    console.log("Selecting " + data.name + " for blue side");
                }
                else {          // set red pokemon if it is mono type
                    if( data.types.length === 1)
                        setRedPokemon({
                            id: data.id,
                            name: data.name,
                            front_default: data.sprites['front_default'],
                            back_default: data.sprites['back_default'],
                            PrimaryType: data.types[0].type.name,
                            SecondaryType: "null"
                        });
                    else        // set red pokemon if it is dual type
                        setRedPokemon({
                            id: data.id,
                            name: data.name,
                            front_default: data.sprites['front_default'],
                            back_default: data.sprites['back_default'],
                            PrimaryType: data.types[0].type.name,
                            SecondaryType: data.types[1].type.name
                        });
                    console.log("Selecting " + data.name + " for red side");
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }


    const chooseWinner = () => {
        if (Math.random() < 0.5) {  // If blue wins
            console.log("Blue Chosen as winner")
            setBlueWins(true)
            setWinMessage("Blue's " + capitalize(BluePokemon.name) + " Wins!")
            setNumBlueWins(numBlueWins+1)

            let paramsBattleWin = new URLSearchParams();    // Update blue pokemon's wins
            paramsBattleWin.append('id', BluePokemon.id);
            paramsBattleWin.append('name', BluePokemon.name);
            paramsBattleWin.append('side', "blue");
            axios.post( "http://localhost:3306/battles/updateWins", paramsBattleWin );

            let paramsBattleStreak = new URLSearchParams();    // Check and update blue pokemon's streak
            paramsBattleStreak.append('id', BluePokemon.id);
            paramsBattleStreak.append('name', BluePokemon.name);
            axios.post( "http://localhost:3306/battles/updateBestStreak", paramsBattleStreak );

            let paramsBattleLoss = new URLSearchParams();   // Update red pokemon's losses
            paramsBattleLoss.append('id', RedPokemon.id);
            paramsBattleLoss.append('name', RedPokemon.name);
            paramsBattleLoss.append('side', "red");
            axios.post( "http://localhost:3306/battles/updateLosses", paramsBattleLoss );

            let paramsBlueType1 = new URLSearchParams();    // Update blue's primary type wins
            paramsBlueType1.append('type', BluePokemon.PrimaryType);
            paramsBlueType1.append('name', BluePokemon.name);
            paramsBlueType1.append('side', "blue");
            axios.post( "http://localhost:3306/types/updateWins", paramsBlueType1 );

            if( !(BluePokemon.SecondaryType === "null") )
            {
                let paramsBlueType2 = new URLSearchParams();    // Update blue's secondary type wins
                paramsBlueType2.append('type', BluePokemon.SecondaryType);
                paramsBlueType2.append('name', BluePokemon.name);
                paramsBlueType2.append('side', "blue");
                axios.post( "http://localhost:3306/types/updateWins", paramsBlueType2 );
            }

            let paramsRedType1 = new URLSearchParams();     // Update red's primary type losses
            paramsRedType1.append('type', RedPokemon.PrimaryType);
            paramsRedType1.append('name', RedPokemon.name);
            paramsRedType1.append('side', "red");
            axios.post( "http://localhost:3306/types/updateLosses", paramsRedType1 );

            if( !(RedPokemon.SecondaryType === "null") )
            {
                let paramsRedType2 = new URLSearchParams();    // Update red's secondary type losses
                paramsRedType2.append('type', RedPokemon.SecondaryType);
                paramsRedType2.append('name', RedPokemon.name);
                paramsRedType2.append('side', "red");
                axios.post( "http://localhost:3306/types/updateLosses", paramsRedType2 );
            }   
        }
        else {  // If red wins
            console.log("Blue Chosen as winner")
            setBlueWins(false)
            setWinMessage("Red's " + capitalize(RedPokemon.name) + " Wins!")
            setNumRedWins(numRedWins+1)

            let paramsBattleWin = new URLSearchParams();    // Update red pokemon's wins
            paramsBattleWin.append('id', RedPokemon.id);
            paramsBattleWin.append('name', RedPokemon.name);
            paramsBattleWin.append('side', "red");
            axios.post( "http://localhost:3306/battles/updateWins", paramsBattleWin );

            let paramsBattleStreak = new URLSearchParams();    // Check and update red pokemon's streak
            paramsBattleStreak.append('id', RedPokemon.id);
            paramsBattleStreak.append('name', RedPokemon.name);
            axios.post( "http://localhost:3306/battles/updateBestStreak", paramsBattleStreak );

            let paramsBattleLoss = new URLSearchParams();   // Update blue pokemon's losses
            paramsBattleLoss.append('id', BluePokemon.id);
            paramsBattleLoss.append('name', BluePokemon.name);
            paramsBattleLoss.append('side', "blue");
            axios.post( "http://localhost:3306/battles/updateLosses", paramsBattleLoss );

            let paramsRedType1 = new URLSearchParams();     // Update red's primary type wins
            paramsRedType1.append('type', RedPokemon.PrimaryType);
            paramsRedType1.append('name', RedPokemon.name);
            paramsRedType1.append('side', "red");
            axios.post( "http://localhost:3306/types/updateWins", paramsRedType1 );

            if( !(RedPokemon.SecondaryType === "null") )
            {
                let paramsRedType2 = new URLSearchParams();    // Update red's secondary type wins
                paramsRedType2.append('type', RedPokemon.SecondaryType);
                paramsRedType2.append('name', RedPokemon.name);
                paramsRedType2.append('side', "red");
                axios.post( "http://localhost:3306/types/updateWins", paramsRedType2 );
            }

            let paramsBlueType1 = new URLSearchParams();    // Update blue's primary type losses
            paramsBlueType1.append('type', BluePokemon.PrimaryType);
            paramsBlueType1.append('name', BluePokemon.name);
            paramsBlueType1.append('side', "blue");
            axios.post( "http://localhost:3306/types/updateLosses", paramsBlueType1 );

            if( !(BluePokemon.SecondaryType === "null") )
            {
                let paramsBlueType2 = new URLSearchParams();    // Update blue's secondary type losses
                paramsBlueType2.append('type', BluePokemon.SecondaryType);
                paramsBlueType2.append('name', BluePokemon.name);
                paramsBlueType2.append('side', "blue");
                axios.post( "http://localhost:3306/types/updateLosses", paramsBlueType2 );
            }
        }
    }

    const pokeballRow = ( numWon ) => {
        if ( numWon === 0 ) {
            return (
                <div>
                    <img src={blankBall} alt="Blank match counter Pokeball"></img>
                    <img src={blankBall} alt="Blank match counter Pokeball"></img>
                    <img src={blankBall} alt="Blank match counter Pokeball"></img>
                </div>
            )
        }
        else if ( numWon === 1 ) {
            return (
                <div>
                    <img src={winBall} alt="Win match counter Pokeball"></img>
                    <img src={blankBall} alt="Blank match counter Pokeball"></img>
                    <img src={blankBall} alt="Blank match counter Pokeball"></img>
                </div>
            )
        }
        else if ( numWon === 2 ) {
            return (
                <div>
                    <img src={winBall} alt="Win match counter Pokeball"></img>
                    <img src={winBall} alt="Win match counter Pokeball"></img>
                    <img src={blankBall} alt="Blank match counter Pokeball"></img>
                </div>
            )
        }
        else if ( numWon === 3 ) {
            return (
                <div>
                    <img src={winBall} alt="Win match counter Pokeball"></img>
                    <img src={winBall} alt="Win match counter Pokeball"></img>
                    <img src={winBall} alt="Win match counter Pokeball"></img>
                </div>
            )
        }
    }


    const showPokeballs = ( isBlue ) => {
        if( isBlue ) {
            if(numBlueWins === 0) {
                return (
                    <div className="BluePokeWins">
                        { pokeballRow(0) }
                    </div>
                )
            }
            else if(numBlueWins === 1) {
                return (
                    <div className="BluePokeWins">
                        { pokeballRow(1) }
                    </div>
                )
            }
            else if(numBlueWins === 2) {
                return (
                    <div className="BluePokeWins">
                        { pokeballRow(2) }
                    </div>
                )
            }
            else {
                return (
                    <div className="BluePokeWins">
                        { pokeballRow(3) }
                    </div>
                )
            }
        }
        else {
            if(numRedWins === 0) {
                return (
                    <div className="RedPokeWins">
                        { pokeballRow(0) }
                    </div>
                )
            }
            else if(numRedWins === 1) {
                return (
                    <div className="RedPokeWins">
                        { pokeballRow(1) }
                    </div>
                )
            }
            else if(numRedWins === 2) {
                return (
                    <div className="RedPokeWins">
                        { pokeballRow(2) }
                    </div>
                )
            }
            else {
                return (
                    <div className="RedPokeWins">
                        { pokeballRow(3) }
                    </div>
                )
            }
        }
    }

    const capitalize = ( s ) => {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    
    return (
        <div className="MainField">
                <p> { winMessage } </p>
                {showPokeballs(true)}
                {showPokeballs(false)}
                <div align="left">
                    <div align="right">
                        
                        <img src={TrainerRed} alt="Red Trainer Sprite" hspace="0"  vspace="0" width="400" height="400" />
                        <div style={RedStyle}>
                            <LayeredImage layers={RedLayers} style={{ width: 450 }} />
                        </div>
                    </div>
                    {
                    <img src={TrainerBlue} alt="Blue Trainer Sprite" hspace="30" vspace="0" align="top" width="250" height="230" />
                    }
                    
                    <div style={BlueStyle}>
                        <LayeredImage layers={BlueLayers} style={{ width: 450 }} />
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
