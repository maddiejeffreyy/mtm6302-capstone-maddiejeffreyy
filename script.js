let fav = [];

/****************************
 * DOM Variables
 *************************/
const $data = document.getElementById('data');
const $info = document.getElementById('info');

const $fetch = document.getElementById('fetch');
const $clearFav = document.getElementById('clear-fav');

const api = "https://pokeapi.co/api/v2/pokemon/";


/****************************
 * Static Function
 ***************************/
function url(url) {
    return url.substring(url.substring(0, url.length - 2).lastIndexOf('/') + 1, url.length - 1)
}

function thumbImage(id) {
    return `<img id="pokemon" src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"`
}

function largeImage(id) {
    return `<img src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"`
}


function createListDataHTML(jsonData) {
    let basicList = '<ul>';
    for (const pokemonData of jsonData.results) {
        basicList += '<li>' + pokemonCard(pokemonData) + '</li>';
    }

    basicList += '</ul>'
    const moreBtn = `<button class="get-more" data-url="${jsonData.next}">View More</button>`
    return basicList + moreBtn;
}

function pokemonCard(pokemonData) {
    const pokemonId = url(pokemonData.url)
    const smallImage = thumbImage(pokemonId)

    // if (addButton) {
    const catchBtn = `<button class="catch">Catch</button>`
    const SeeMore = `<button class="see-details" data-id="${pokemonId}">See More</button>`
    // }
    return `
    <p><h2> ${pokemonData.name}</h2></p>
    <p>${smallImage}</p>
    <p>${catchBtn}</p>
    <p>${SeeMore}</p>
    `
}

function getStorageItemInfo() {
    if (localStorage.getItem('favourites')) {
        return localStorageUserData = JSON.parse(localStorage.getItem('favourites'))
    }

    return [];
}

/****************************
 * Async Functions
 ***************************/
async function fetchDataReturnList(url) {
    // call fetch using await keyword 
    const response = await fetch(url)
    // call response.json using await keyword 
    const json = await response.json()
    console.log(json);
    // This is a fail safe 
    // check if the reponse actually has an date 
    if (json.results) {
        return createListDataHTML(json)
    }
    return "";
}

async function getListDataHtml(url) {
    const returnHtml = await fetchDataReturnList(url)
    $data.innerHTML = returnHtml;
}

/****************************
 * Event Listeners
 ***************************/
$data.addEventListener('click', function (e) {
    // Event Delegation for catch button
    if (e.target.classList.contains('catch')) {
        const pokemonId = e.target.dataset.id;
        // check if this pokemon id does not exist first
        if (!fav.includes(pokemonId)) {
            fav.push(pokemonId);
            updateStorageItem();
        }
    }

    // Event Delegation for get-more button
    if (e.target.classList.contains('get-more')) {
        const fetchUrl = e.target.dataset.url;
        getListDataHtml(fetchUrl)
    }
});


$clearFav.addEventListener('click', function (e) {
    localStorage.setItem('favourites', '')
    fav = [];
});

/****************************
 * Global Calls 
 *************************/
fav = getStorageItemInfo();
//get first 20
getListDataHtml(api);
createFavListHTML();