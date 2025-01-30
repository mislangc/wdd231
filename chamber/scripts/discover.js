import { places } from "../data/places.mjs";

const discoverPlaces = document.querySelector('#discover-places');

function displayPlaces(places) {
    places.forEach((place) => {
        const card = document.createElement('div');
        const img = document.createElement('img');
        const name = document.createElement('h2');
        const address = document.createElement('address');
        const desc = document.createElement('p');
        const button = document.createElement('a');

        img.setAttribute('src', place.image);
        img.setAttribute('alt', `Photo of ${place.name}`);
        img.setAttribute('loading', 'lazy');
        img.setAttribute('width', '300');
        img.setAttribute('height', '200');
        name.textContent = place.name;
        address.textContent = place.address;
        desc.textContent = place.description;
        button.textContent = 'Learn more';
        button.setAttribute('href', place.link);

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(desc);
        card.appendChild(button);

        discoverPlaces.appendChild(card);
    })
}

displayPlaces(places);

// --------------------------------------------------------- Local Storage
const message = document.querySelector('#discover-message');
const currentDate = new Date();
const lastVisitDate = localStorage.getItem("lastVisit");
const msToDays = 86400000;

if (lastVisitDate) {
    const msBetweenVisit = currentDate.getTime() - parseInt(lastVisitDate);
    const days = msBetweenVisit / msToDays;
    if (days < 1) {
        message.textContent = "Back so soon! Awesome!"
    } else if (days > 1 && days < 2) {
        message.textContent = `You last visited ${Math.floor(days)} day ago.`;
    } else {
        message.textContent = `You last visited ${Math.floor(days)} days ago.`
    }
} else {
    message.textContent = "Welcome! Let us know if you have questions.";
}

localStorage.setItem("lastVisit", currentDate.getTime());