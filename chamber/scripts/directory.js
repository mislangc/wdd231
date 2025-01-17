// ------------------------------------------------------- Header
// --------------------- Hamburger Button

const hamMenu = document.querySelector('#ham-menu');
const hamButton = document.querySelector('#ham-button');

hamButton.addEventListener("click", () => {
    hamButton.classList.toggle('open');
    hamMenu.classList.toggle('open');
});
// ------------------------------------------------------- Main
const gridButton = document.querySelector('#grid-button');
const listButton = document.querySelector('#list-button');

gridButton.addEventListener("click", () => {
    displayCards.classList.add('grid');
    displayCards.classList.remove('list');
});

listButton.addEventListener("click", () => {
    displayCards.classList.add('list');
    displayCards.classList.remove('grid');
}
)

// ---------- Get JSON file
const url = "data/members.json";
const displayCards = document.querySelector('#display-cards');

async function displayData(url) {
    const data = await getData(url);
    const cards = await data.map(makeCards);
    displayCards.innerHTML = cards.join("");
}

async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function makeCards(member) {
    return `<section>
        <img src="${member.image}" alt="logo of ${member.name}">
        <h2>${member.name}</h2>
        <p>${member.address}</p>
        <p>${member.phoneNum}</p>
        <a href="${member.url}">Details</a>
    </section>`
}

displayData(url);


// ------------------------------------------------------- Footer
// ---------- Get current year
const currentYear = document.querySelector('#current-year');

const date = new Date();
currentYear.textContent = date.getFullYear();

// ---------- Get last modification date
const lastModificationDate = document.querySelector('#last-modif');

const modifDate = new Date(document.lastModified);
lastModificationDate.innerHTML = `${modifDate.toLocaleDateString()} ${modifDate.toLocaleTimeString()}`;