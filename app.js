// DOM objects
const mainScreen = document.querySelector('.main-screen');
    //Grab name
const pokeName = document.querySelector('.poke-name');
    //Grab PokeID
const pokeId = document.querySelector('.poke-id');
    //Front Image
const pokeFrontImage = document.querySelector('.poke-front-image');
   //Back Image
const pokeBackImage = document.querySelector('.poke-back-image');
    //Type one
const pokeTypeOne = document.querySelector('.poke-type-one');
    //Type two
const pokeTypeTwo = document.querySelector('.poke-type-two');
    //Weight
const pokeWeight = document.querySelector('.poke-weight');
    //Height
const pokeHeight = document.querySelector('.poke-height');


//constants and variables
const TYPES = [
    'normal', 'fighting', 'flying', 'poison', 'ground', 'rock',
    'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric',
    'psychic', 'ice', 'dragon', 'dark', 'fairy'
];


//Functions
const resetScreen = () => {
    mainScreen.classList.remove('hide');
    for (const type of TYPES) {
        mainScreen.classList.remove(type);
    }
};






resultFromFetch = fetch('https://pokeapi.co/api/v2/pokemon/3')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        
        
        resetScreen();

        const dataTypes = data['types'];
        const dataFirstType = dataTypes[0];
        const dataSecondType = dataTypes[1];
        pokeTypeOne.textContent = dataFirstType['type']['name'];
        if (dataSecondType) {
            pokeTypeTwo.classList.remove('hide');
            pokeTypeTwo.textContent = dataSecondType['type']['name'];
        } else {
            pokeTypeTwo.classList.add('hide');
            pokeTypeTwo.textContent = '';
        }

        mainScreen.classList.add(dataFirstType['type']['name']);
        

        pokeName.textContent = data['name'];
        pokeId.textContent = data['id'];
        pokeWeight.textContent = data['weight'];
        pokeHeight.textContent = data['height'];

       

        //updating html img src NOT WORKING COME BACK 
        pokeFrontImage.src = data['sprites']['front_default'] || '';
        pokeBackImage.src = data['sprites']['back_default'] || '';
    });