import React from 'react';
import axios from 'axios';
import LayeredImage from "react-layered-image";
import TrainerBlue from '../assets/BluePlayerTrainer.png';
import TrainerRed2 from '../assets/RedPlayerTrainer2.png';
import PokeBallTossRed from '../assets/pokeball_toss_red.gif';
import PokeBallTossBlue from '../assets/pokeball_toss_blue.gif';
import PokePlatform from '../assets/background.png';
import winBall from '../assets/winPoke.png';
import blankBall from '../assets/losePoke.png';
import Pokewalker from '../assets/Pokewalker.png';
import './../css/BattleArea.css';


function BattleArea() {
    let [winMessage, setWinMessage] = React.useState('Get Ready Trainers!');
    let [counter, setCounter] = React.useState(10);
    let [numBlueWins, setNumBlueWins] = React.useState(0);
    let [numRedWins, setNumRedWins] = React.useState(0);
    let [blueWins, setBlueWins] = React.useState(null);     // null = start of loading, true = blue wins, false = red wins
    let [BlueEffectiveness, setBlueEffectiveness] = React.useState(1);
    let [RedEffectiveness, setRedEffectiveness] = React.useState(1);
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
        right: 750,  
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
        left: 700,
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


    // This function manages the timer as it counts down from 10 to 0, handling different calls 
    // when the counter reaches different milestones.  
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
            // Reset pokemon effectiveness for new round
            setBlueEffectiveness(1);
            setRedEffectiveness(1);

            if( blueWins === null ) {
                console.log("Start of counter");
            }
            else if( numBlueWins === 3 ) {       
                console.log("Blue wins match, resetting counters and fetching new pokemon");
                setNumBlueWins(0);
                setNumRedWins(0);
                getPokemon(true);
                getPokemon(false);
            }
            else if( numRedWins === 3 ) {   
                console.log("Red wins match, resetting counters and fetching new pokemon");
                setNumBlueWins(0);
                setNumRedWins(0);
                getPokemon(true);
                getPokemon(false);
            } 
            else if( blueWins ) {   // If blue won current round
                console.log("Blue wins round, fetching new red pokemon");
                getPokemon(false);
            }
            else if( !blueWins ) {  // If red won current round
                console.log("Red wins round, fetching new blue pokemon");
                getPokemon(true);
            }
        } 

        if( counter === 7 ) {
            setWinMessage("Fight!")
        }

        if ( counter === 3 ) {  // Calculate effectiveness early to prevent stuttering once the counter reaches 0
            calculateEffectiveness()
        }

        if (counter === 0) {
            console.log("End of round, choosing winner");
            chooseWinner()
            setCounter(10)
        }

        const timer = counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);


    // This function gets a random pokemon between 1 and 151 to use for red or blue's side
    const getPokemon = ( isBlue ) => {
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
                    if( data.types.length === 1) {
                        setBluePokemon({
                            id: data.id,
                            name: data.name,
                            front_default: data.sprites['front_default'],
                            back_default: data.sprites['back_default'],
                            PrimaryType: data.types[0].type.name,
                            SecondaryType: "null"
                        });
                        console.log(data.name + " (" + data.types[0].type.name + ") for blue side");
                    }
                    else {        // set blue pokemon if it is dual type
                        setBluePokemon({
                            id: data.id,
                            name: data.name,
                            front_default: data.sprites['front_default'],
                            back_default: data.sprites['back_default'],
                            PrimaryType: data.types[0].type.name,
                            SecondaryType: data.types[1].type.name
                        });
                        console.log(data.name + " (" + data.types[0].type.name + ", " + data.types[1].type.name + ") for blue side");
                    }
                }
                else {          // set red pokemon if it is mono type
                    if( data.types.length === 1) {
                        setRedPokemon({
                            id: data.id,
                            name: data.name,
                            front_default: data.sprites['front_default'],
                            back_default: data.sprites['back_default'],
                            PrimaryType: data.types[0].type.name,
                            SecondaryType: "null"
                        });
                        console.log(data.name + " (" + data.types[0].type.name + ") for red side");
                    }
                    else {       // set red pokemon if it is dual type
                        setRedPokemon({
                            id: data.id,
                            name: data.name,
                            front_default: data.sprites['front_default'],
                            back_default: data.sprites['back_default'],
                            PrimaryType: data.types[0].type.name,
                            SecondaryType: data.types[1].type.name
                        });
                        console.log(data.name + " (" + data.types[0].type.name + ", " + data.types[1].type.name + ") for red side");
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }


    // This function takes the name of a type and the side it belongs to to calculate 
    // the effectiveness it has against its opponent 
    const checkEffectiveness = async ( typeName, side ) =>  {
        await axios.get( "http://localhost:3306/types/" + typeName )
            .then(res => {
                const data = res.data.damage_relations;
                console.log(typeName + " data type relations")
                console.log(data)

                let effectiveness = 1;  // keeps track of effectiveness in case opponent has multiple types
                let notFound = true;    // tracks whether opponents type has a relation, as each type will be in the data once or not at all

                if( side === "blue" ) { // If the side is blue
                    // Caclulate the Effectiveness against red's first type
                    for( let i = 0; i < data.double_damage_to.length && notFound; i++ ) {   // Search if opponent take's double damage
                        if( data.double_damage_to[i].name === RedPokemon.PrimaryType )
                        {
                            console.log(typeName + " x2 vs " + data.double_damage_to[i].name);
                            notFound = false;
                            effectiveness *= 2;
                        }
                    }
                    for( let i = 0; i < data.half_damage_to.length && notFound; i++ ) {     // Search if opponent take's half damage
                        if( data.half_damage_to[i].name === RedPokemon.PrimaryType ) {
                            console.log(typeName + " x1/2 vs " + data.half_damage_to[i].name);
                            notFound = false;
                            effectiveness *= .5;
                        }
                    }
                    for( let i = 0; i < data.no_damage_to.length && notFound; i++ ) {       // Search if opponent take's no damage
                        if( data.no_damage_to[i].name === RedPokemon.PrimaryType ) {
                            console.log(typeName + " x0 vs " + data.no_damage_to[i].name);
                            notFound = false;
                            effectiveness *= 0;
                        }
                    }
                    if( notFound ) {    // If there is no special relation
                        console.log(typeName + " x1 vs " + RedPokemon.PrimaryType);
                    }
                    
                    // reset not found in case of red having second type
                    notFound = true;

                    if( RedPokemon.SecondaryType !== "null" ) { 
                        // Caclulate the Effectiveness against red's second type
                        for( let i = 0; i < data.double_damage_to.length && notFound; i++ ) {   // Search if opponent take's double damage
                            if( data.double_damage_to[i].name === RedPokemon.SecondaryType )
                            {
                                console.log(typeName + " x2 vs " + data.double_damage_to[i].name);
                                notFound = false;
                                effectiveness *= 2;
                            }
                        }
                        for( let i = 0; i < data.half_damage_to.length && notFound; i++ ) {   // Search if opponent take's half damage
                            if( data.half_damage_to[i].name === RedPokemon.SecondaryType ) {
                                console.log(typeName + " x1/2 vs " + data.half_damage_to[i].name);
                                notFound = false;
                                effectiveness *= .5;
                            }
                        }
                        for( let i = 0; i < data.no_damage_to.length && notFound; i++ ) {   // Search if opponent take's no damage
                            if( data.no_damage_to[i].name === RedPokemon.SecondaryType ) {
                                console.log(typeName + " x0 vs " + data.no_damage_to[i].name);
                                notFound = false;
                                effectiveness *= 0;
                            }
                        }
                        if( notFound ) {     // If there is no special relation
                            console.log(typeName + " x1 vs " + RedPokemon.SecondaryType);
                        }
                    }

                    let temp = BlueEffectiveness * effectiveness;
                    console.log(temp) 
                    setBlueEffectiveness( temp )
                }
                else {  // If the side is Red
                    // Caclulate the Effectiveness against blue's first type
                    for( let i = 0; i < data.double_damage_to.length && notFound; i++ ) {   // Search if opponent take's double damage
                        if( data.double_damage_to[i].name === BluePokemon.PrimaryType )
                        {
                            console.log(typeName + " x2 vs " + data.double_damage_to[i].name);
                            notFound = false;
                            effectiveness *= 2;
                        }
                    }
                    for( let i = 0; i < data.half_damage_to.length && notFound; i++ ) {   // Search if opponent take's half damage
                        if( data.half_damage_to[i].name === BluePokemon.PrimaryType ) {
                            console.log(typeName + " x1/2 vs " + data.half_damage_to[i].name);
                            notFound = false;
                            effectiveness *= .5;
                        }
                    }
                    for( let i = 0; i < data.no_damage_to.length && notFound; i++ ) {   // Search if opponent take's no damage
                        if( data.no_damage_to[i].name === BluePokemon.PrimaryType ) {
                            console.log(typeName + " x0 vs " + data.no_damage_to[i].name);
                            notFound = false;
                            effectiveness *= 0;
                        }
                    }
                    if( notFound ) {      // If there is no special relation
                        console.log(typeName + " x1 vs " + BluePokemon.PrimaryType);
                    }

                    // reset not found in case of blue having second type
                    notFound = true;

                    if( BluePokemon.SecondaryType !== "null" ){
                        // Caclulate the Effectiveness against blue's second type
                        for( let i = 0; i < data.double_damage_to.length && notFound; i++ ) {   // Search if opponent take's double damage
                            if( data.double_damage_to[i].name === BluePokemon.SecondaryType )
                            {
                                console.log(typeName + " x2 vs " + data.double_damage_to[i].name);
                                notFound = false;
                                effectiveness *= 2;
                            }
                        }
                        for( let i = 0; i < data.half_damage_to.length && notFound; i++ ) {   // Search if opponent take's half damage
                            if( data.half_damage_to[i].name === BluePokemon.SecondaryType ) {
                                console.log(typeName + " x1/2 vs " + data.half_damage_to[i].name);
                                notFound = false;
                                effectiveness *= .5
                            }
                        }
                        for( let i = 0; i < data.no_damage_to.length && notFound; i++ ) {   // Search if opponent take's no damage
                            if( data.no_damage_to[i].name === BluePokemon.SecondaryType ) {
                                console.log(typeName + " x0 vs " + data.no_damage_to[i].name);
                                notFound = false;
                                effectiveness *= 0;
                            }
                        }
                        if( notFound ) {      // If there is no special relation
                            console.log(typeName + " x1 vs " + BluePokemon.SecondaryType);
                        } 
                    }  
                    let temp = RedEffectiveness * effectiveness;
                    console.log(temp) 
                    setRedEffectiveness( temp )
                }

                console.log("Calculated effectiveness of " + side + " " + effectiveness );
            })
            .catch((error) => {
                console.log(error);
            })
    }


    // This function calls check effectiveness for each of red and blue's types in order to get their total effectiveness
    const calculateEffectiveness = async () => {

        await checkEffectiveness( BluePokemon.PrimaryType, "blue" );
        if( BluePokemon.SecondaryType !== "null" )
        {
            await checkEffectiveness( BluePokemon.SecondaryType, "blue" );
        }

        await checkEffectiveness( RedPokemon.PrimaryType,"red" );
        if( RedPokemon.SecondaryType !== "null" )
        {
            await checkEffectiveness( RedPokemon.SecondaryType, "red" );
        }
    }


    // This function compares red and blue's effectiveness, if they are the same then the result is random
    const compareEffectiveness = () => {
        console.log("Blue: ");
        console.log(BlueEffectiveness);
        console.log("Red: ");
        console.log(RedEffectiveness);

        if( BlueEffectiveness > RedEffectiveness ) {
            console.log("BLUE EFFECTIVE WINNER: " + BluePokemon.name);
            return true;
        }
        else if( BlueEffectiveness < RedEffectiveness ) {
            console.log("RED EFFECTIVE WINNER: " + BluePokemon.name);
            return false;
        }
        else if( Math.random() <= 0.5 ) {
            console.log("BLUE RANDOM WINNER: " + BluePokemon.name);
            return true;
        }
        else {
            console.log("RED RANDOM WINNER: " + RedPokemon.name);
            return false;
        }
    }


    // This function calls compareEffectiveness() to decide the winner then makes several calls 
    // to store information about the pokemon in the database
    const chooseWinner = () => {
        if ( compareEffectiveness() ) {  // If blue wins
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

            if( BluePokemon.SecondaryType !== "null" )
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

            if( RedPokemon.SecondaryType !== "null" )
            {
                let paramsRedType2 = new URLSearchParams();    // Update red's secondary type losses
                paramsRedType2.append('type', RedPokemon.SecondaryType);
                paramsRedType2.append('name', RedPokemon.name);
                paramsRedType2.append('side', "red");
                axios.post( "http://localhost:3306/types/updateLosses", paramsRedType2 );
            }   
        }
        else {  // If red wins
            console.log("Red chosen as winner")
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

            if( RedPokemon.SecondaryType !== "null" )
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

            if( BluePokemon.SecondaryType !== "null" )
            {
                let paramsBlueType2 = new URLSearchParams();    // Update blue's secondary type losses
                paramsBlueType2.append('type', BluePokemon.SecondaryType);
                paramsBlueType2.append('name', BluePokemon.name);
                paramsBlueType2.append('side', "blue");
                axios.post( "http://localhost:3306/types/updateLosses", paramsBlueType2 );
            }
        }
    }

    // This capitalizes the pokemon's name for the win message
    const capitalize = ( s ) => {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    // This function manages the html for the pokeball round counters for either trainer depending on
    // their number of wins
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


    // This function calls pokeballRow for both trainers depending on their number of wins to display
    // the round counters
    const showPokeballs = ( isBlue ) => {
        if( isBlue ) {  // If called for blue side
            if(numBlueWins === 0) {
                return <div className="BluePokeWins"> { pokeballRow(0) } </div>
            }
            else if(numBlueWins === 1) {
                return <div className="BluePokeWins"> { pokeballRow(1) } </div>
            }
            else if(numBlueWins === 2) {
                return <div className="BluePokeWins"> { pokeballRow(2) } </div>
            }
            else {
                return <div className="BluePokeWins"> { pokeballRow(3) } </div>
            }
        }
        else {  // If called for red side
            if(numRedWins === 0) {
                return <div className="RedPokeWins"> { pokeballRow(0) } </div>
            }
            else if(numRedWins === 1) {
                return <div className="RedPokeWins"> { pokeballRow(1) } </div>
            }
            else if(numRedWins === 2) {
                return <div className="RedPokeWins"> { pokeballRow(2) } </div>
            }
            else {
                return <div className="RedPokeWins"> { pokeballRow(3) } </div>
            }
        }
    }

    
    return (
        <div className="MainField">
                <p> { winMessage } </p>
                {showPokeballs(true)}
                {showPokeballs(false)}
                <div align="left">
                    <div class="RedSpriteContainer" align="right">
                        <img src={TrainerRed2} alt="Red Trainer Sprite" hspace="0"  vspace="0" width="300" height="400" />
                        <div style={RedStyle}>
                            <LayeredImage layers={RedLayers} style={{ width: 450 }} />
                        </div>
                    </div>
                    <img src={TrainerBlue} alt="Blue Trainer Sprite" hspace="30" vspace="0" align="top" width="250" height="230" />
                    <div style={BlueStyle}>
                        <LayeredImage layers={BlueLayers} style={{ width: 450 }} />
                    </div>
                </div>
              <div class="container">
                 <img src = {Pokewalker} alt="Timer" width="150" height="150" display="hidden"/>
                 <div class="centered">{counter}</div>
              </div>
        </div>
    )
}

export default BattleArea;
