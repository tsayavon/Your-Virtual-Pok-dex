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





console.log(pokeName);


resultFromFetch = fetch('https://pokeapi.co/api/v2/pokemon/1')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        mainScreen.classList.remove('hide');
        pokeName.textContent = data['name'];
        pokeId.textContent = data['id'];
        pokeWeight.textContent = data['weight'];
        pokeHeight.textContent = data['height'];

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

        //updating html img src
        pokeFrontImage.scr = data['sprites']['front_default'] || '';
        pokeBackImage.scr = data['sprites']['back_default'] || '';
    });