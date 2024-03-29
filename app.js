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
    //List items
const pokeListItems = document.querySelectorAll('.list-item');
    //left button
const leftButton = document.querySelector('.left-button');
    //right button
const rightButton = document.querySelector('.right-button');
// --------------------------------------------------------- //
    //top controller's d pad
const topDButton = document.querySelector('.d-pad__cell top');
    //left controller's d pad
const leftDButton = document.querySelector('.d-pad__cell left');
    //right controller's d pad
const rightDButton = document.querySelector('.d-pad__cell right');
    //bottom controller's d pad
const bottomDButton = document.querySelector('.d-pad__cell bottom');
    // B Button
const bButton = document.querySelector('.buttons__buttonB');
    // A button
const aButton = document.querySelector('buttons__buttonA');









//constants and variables
const TYPES = [
    'normal', 'fighting', 'flying', 'poison', 'ground', 'rock',
    'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric',
    'psychic', 'ice', 'dragon', 'dark', 'fairy'
];
let prevUrl = null;
let nextUrl = null;

//Functions
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

const resetScreen = () => {
    mainScreen.classList.remove('hide');
    for (const type of TYPES) {
        mainScreen.classList.remove(type);
    }
};

const fetchPokeList = url => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const { results, previous, next } = data;
        prevUrl = previous;
        nextUrl = next;

        for (let i = 0; i < pokeListItems.length ; i++) {
            const pokeListItem = pokeListItems[i];
            const resultData = results[i];
            

            if (resultData) {
                const { name, url } = resultData;
                const urlArray = url.split('/');
                const id = urlArray[urlArray.length - 2];
                //console.log(urlArray);
                pokeListItem.textContent = id + '. ' + capitalize(name);
            } else {
                pokeListItem.textContent = '';
            }
        }
});
};

const fetchPokeData = id => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data => {
        resetScreen();

        const dataTypes = data['types'];
        const dataFirstType = dataTypes[0];
        const dataSecondType = dataTypes[1];
        pokeTypeOne.textContent = capitalize(dataFirstType['type']['name']);
        if (dataSecondType) {
            pokeTypeTwo.classList.remove('hide');
            pokeTypeTwo.textContent = capitalize(dataSecondType['type']['name']);
        } else {
            pokeTypeTwo.classList.add('hide');
            pokeTypeTwo.textContent = '';
        }

        mainScreen.classList.add(dataFirstType['type']['name']);
        

        pokeName.textContent = capitalize(data['name']);
        pokeId.textContent = '#' + data['id'].toString().padStart(3,'0');
        pokeWeight.textContent = data['weight'] + 'kg';
        pokeHeight.textContent = data['height'] + 'm';

       //updating html img src NOT WORKING COME BACK 
        pokeFrontImage.src = data['sprites']['front_default'] || '';
        pokeBackImage.src = data['sprites']['back_default'] || '';
    });
}

const handleLeftButtonClick = () => {
    if (prevUrl) {
        fetchPokeList(prevUrl);
    }
}
const handleRightButtonClick = () => {
    if (nextUrl) {
        fetchPokeList(nextUrl);
    }

};

const handleListItemClick = (e) => {
    if (!e.target) return;

    const listItem = e.target;
    if (!listItem.textContent) return;

    const id = listItem.textContent.split('.')[0];
    fetchPokeData(id);
    

};







// event listeners
leftButton.addEventListener('click', handleLeftButtonClick);
rightButton.addEventListener('click', handleRightButtonClick);
for (const pokeListItem of pokeListItems) {
    pokeListItem.addEventListener('click', handleListItemClick);
};



//start app
fetchPokeList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');


// let audio = document.getElementById("bgAudio");
//     audio.volume = 0.05;
