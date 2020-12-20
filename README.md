# Pokemon Battler

## Table of Contents

- [About](#About)
- [Future-Plans](#Future-Plans)
- [Structure](#Structure)
- [Setup](#Setup)
- [Developers](#Developers)

## About

The purpose of this website is to use the PokeAPI in order to simutlate pokemon battles and to then generate, store, and present information based on the results of these battles.  

## Future-Plans

* **Scaleablity** - The website could still do to scale better when the window is resized or if visited on a mobile device.
* **Animations** - In the battle sequence, pokemon or their trainers sprites could have more action having with the adition of gifs, or perhaps the resizing of the image to represent them attacking or fainting on a loss.
* **More Advanced Combat** - Currently, battles are decided by matching the effectiveness of one type against anther.  It should be possible to make this much more in depth with the pokemon's move list and defenses also all being available from PokeAPI with the addition of healthbars or randomly selecting attacks and calculating damage.  
* **Structure** - At the moment BattleArea.js is a bit bulky and could be split into separate components.



Files are generally organized by their type, and are further divided into subcategories in this repository. Below elaborates on the various sub-repos and their intended purpose.

Base:

 * **.gitignore** - File that designates which files Github will ignore when pushing to the repository
 * **manifest.yml** - Specifies details about the project for PCF
 * **package.json** - Everything that the application is dependent on is specified here.

## Structure

Structure is detailed throughout the folders in their respective README.md's

## Setup

#### Frontend

`git clone https://github.com/DFSCodeOrange/Team12-PokemonBattler.git`

`cd frontend-app`

`npm install`

`npm start`

#### Backend
`git clone https://github.com/DFSCodeOrange/Team12-PokemonBattler.git`

`cd backend-app`

`npm install`

`npm start`

## Developers

This application was developed by Team Scrambled Spring 2019

Copyright: 2019, Discover Financial Services, LLC
