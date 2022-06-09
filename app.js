// DOM objects
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





console.log(pokeName);


resultFromFetch = fetch('https://pokeapi.co/api/v2/pokemon/1')
    .then(res => res.json())
    .then(data => {
        console.log(data);
    });