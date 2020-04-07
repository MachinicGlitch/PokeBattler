import React from 'react';
import axios from 'axios';
import './../css/BattleArea.css';
import TrainerBlue from '../assets/BluePlayerTrainer.png';
import TrainerRed from '../assets/RedPlayerTrainer.png';
import Explosion from '../assets/explosion_noloop.gif';
import PokeBallTossRed from '../assets/pokeball_toss_red.gif';
import PokeBallTossBlue from '../assets/pokeball_toss_blue.gif';
import winBall from '../assets/winPoke.png';
import blankBall from '../assets/losePoke.png';



function BattleArea() {

    let [startRendering, setStartRendering] = React.useState(false);
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
            if( numBlueWins === 3 ) {
                setWinMessage("Blue Wins!")
                setNumBlueWins(0);
                setNumRedWins(0);
            }
            else if( numRedWins === 3 ) {
                setWinMessage("Red Wins!")
                setNumBlueWins(0);
                setNumRedWins(0);
            }
            if( blueWins === null) {
                PokemonPopulator();
                getPokemon(true);
                getPokemon(false);
                setStartRendering(true);
            }
            else if( blueWins )
                getPokemon(false);
            else
                getPokemon(true);

        }
        if( counter === 7) {
            setWinMessage("Fight!")
        }
        const timer = counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);

        if (counter === 0) {
            chooseWinner()
            setCounter(10)
        }
    }, [counter]);


    const getPokemon = ( isBlue ) => {
        axios.get( "http://localhost:3306/pokemon/" + (Math.floor(Math.random() * 151) + 1) )
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


    const PokemonPopulator = () => {
        //var Array = new Array[]; 
        let json = "";

        // for(var i = 1; i <= 151; i++)
        // {

            axios.get( "http://localhost:3306/pokemon/" + (3) )
            .then(res => {
                const data = res.data;
                
                var wins = (Math.floor(Math.random() * 50) + 20);
                var losses = (Math.random() * 70);
                var times_chosen = (Math.floor(Math.random() * 100) + losses); 
                var best_streak = (Math.random() * 15);

                wins -= ( wins % 1 );
                losses -= ( losses % 1 );
                times_chosen -= ( times_chosen % 1 );
                best_streak -= ( best_streak % 1 );

                var obj = '{'
                    +'"id" : ' + data.id + ','
                    +'"name" : ' + data.name + ','
                    +'"wins" : ' + wins + ','
                    +'"losses" : ' + losses + ','
                    +'"times_chosen" : ' + times_chosen + ','
                    +'"best_streak" : ' + best_streak
                    +'}';

                //set1.add(obj);
                console.log("obj : " + obj);
                json = JSON.stringify(obj);
                console.log(json);
            });

            
        // }
        
        // console.log(set1);
        
        // let json = JSON.stringify(Array.from(set1.values()))
        // let json = JSON.stringify(Array.from(set1));
        // let json = JSON.stringify(Array.from(set1.keys()));

        console.log(json);
        
        let post_data={json_data:json}

        axios({
            method: "POST",
            url: "http://localhost:3306/pokemon/update",
            data: { // was params
                APIResponse: post_data
            }
        }).then(res => {
            console.log(res.data)
            this.setState({
                backend_input: res.data
            })
        });

    }


    const chooseWinner = () => {
        if (Math.random() < 0.5) {
            setBlueWins(true)
            setWinMessage("Blue's " + capitalize(BluePokemon.name) + " Wins!")
            setNumBlueWins(numBlueWins+1)
        }
        else {
            setBlueWins(false)
            setWinMessage("Red's " + capitalize(RedPokemon.name) + " Wins!")
            setNumRedWins(numRedWins+1)
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
        <div className="MainField">
                <p> { winMessage } </p>
                {showPokeballs(true)}
                {showPokeballs(false)}
                <div align="left">
                    <div align="right">
                        { startRendering ? <img src={RedPokemon.front_default} alt="Red Trainer Sprite" width="250" height="250" /> : "" }
                        <img src={TrainerRed} alt="Red Trainer Sprite" hspace="0"  vspace="0" width="400" height="400" />
                    </div>
                    <img src={TrainerBlue} alt="Blue Trainer Sprite" hspace="30" vspace="0" align="top" width="250" height="230" />
                    {startRendering ? <img src={BluePokemon.back_default} alt="Blue Trainer Sprite" width="250" height="250" /> : ""}
                </div>
            <p>Countdown: {counter}</p>
        </div>
    )
}



export default BattleArea;