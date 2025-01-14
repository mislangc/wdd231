const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";
const cards = document.querySelector("#cards");
const cardsFilter = document.querySelector("#cards-filter");

async function getProphetData(url) {
    const response = await fetch(url);
    const data = await response.json();

    const all = document.createElement('button');
    const utah = document.createElement('button');
    const idaho = document.createElement('button');
    const notUS = document.createElement('button');
    const tenOrMoreChildren = document.createElement('button');
    const fifteenYearsService = document.createElement('button');

    all.textContent = 'All';
    utah.textContent = 'Utah';
    idaho.textContent = 'Idaho';
    notUS.textContent = 'Not US';
    tenOrMoreChildren.textContent = '10+ Children';
    fifteenYearsService.textContent = '15+ Yrs Service';

    all.addEventListener("click", () => {
        displayProphets(data.prophets);
    });
    utah.addEventListener("click", () => {
        const newData = data.prophets.filter(prophet => prophet.birthplace === 'Utah');
        displayProphets(newData);
    });
    idaho.addEventListener("click", () => {
        const newData = data.prophets.filter(prophet => prophet.birthplace === 'Idaho');
        displayProphets(newData);
    });
    notUS.addEventListener("click", () => {
        const newData = data.prophets.filter(prophet => prophet.birthplace === 'England');
        displayProphets(newData);
    });
    tenOrMoreChildren.addEventListener("click", () => {
        const newData = data.prophets.filter(prophet => prophet.numofchildren >= 10);
        displayProphets(newData);
    });
    fifteenYearsService.addEventListener("click", () => {
        const newData = data.prophets.filter(prophet => prophet.length >= 15);
        displayProphets(newData);
    });

    cardsFilter.appendChild(all);
    cardsFilter.appendChild(utah);
    cardsFilter.appendChild(idaho);
    cardsFilter.appendChild(notUS);
    cardsFilter.appendChild(tenOrMoreChildren);
    cardsFilter.appendChild(fifteenYearsService);

    //console.table(data.prophets);
    displayProphets(data.prophets);
}

getProphetData(url);

const displayProphets = (prophets) => {
    const array = []
    prophets.forEach((prophet) => {
        let section = document.createElement("section");
        let fullName = document.createElement("h2");
        let birthDate = document.createElement("p");
        let birthPlace = document.createElement("p");
        let portrait = document.createElement("img");

        fullName.innerHTML = `${prophet.name} ${prophet.lastname}`;
        birthDate.innerHTML = `Date of Birth: ${prophet.birthdate}`;
        birthPlace.innerHTML = `Place of Birth: ${prophet.birthplace}`;

        portrait.src = prophet.imageurl;
        portrait.alt = `Portrait of the prophet ${prophet.name} ${prophet.lastname}`;
        if (prophet.order === 1) {
            portrait.alt += ` - 1st Latter-Day President`;
        } else if (prophet.order === 2) {
            portrait.alt += ` - 2nd Latter-Day President`;
        } else if (prophet.order === 3) {
            portrait.alt += ` - 3rd Latter-Day President`;
        } else {
            portrait.alt += ` - ${prophet.order}th Latter-Day President`;
        }
        portrait.loading = `lazy`;
        portrait.width = `170`;
        portrait.height = `220`;

        /*
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of the prophet ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340')
        portrait.setAttribute('height', '440');
        */

        section.appendChild(fullName);
        section.appendChild(birthDate);
        section.appendChild(birthPlace);
        section.appendChild(portrait);

        array.push(`<section>${section.innerHTML}</section>`);
    });
    cards.innerHTML = array.join("");
}