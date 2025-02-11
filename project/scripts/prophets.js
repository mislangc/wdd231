const url = "data/prophets.json";
const showProphets = document.querySelector('#show-prophets');
const noFilter = document.querySelector('button.all');
const bomFilter = document.querySelector('button.book-of-mormon');
const bibleFilter = document.querySelector('button.bible');

async function dataToDOM(data) {
    const list = await getProphetsData(data);

    noFilter.addEventListener('click', () => {
        showProphets.innerHTML = "";
        list.map(prophetCards);
    });

    bomFilter.addEventListener('click', () => {
        showProphets.innerHTML = "";
        const bomProphets = list.filter(prophet => prophet.book === "Book of Mormon")
        bomProphets.map(prophetCards);
    });

    bibleFilter.addEventListener('click', () => {
        showProphets.innerHTML = "";
        const bibleProphets = list.filter(prophet => prophet.book === "Bible")
        bibleProphets.map(prophetCards);
    });

    list.map(prophetCards);
}

async function getProphetsData(data) {
    try {
        const response = await fetch(data);
        if (response.ok) {
            const list = await response.json();
            return list;
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function prophetCards(prophet) {
    const card = document.createElement('div');

    if (prophet.name === "Lehi" || prophet.name === "Nephi") {
        card.innerHTML = `
        <img src="images/${prophet.image}" alt="picture of ${prophet.name} the prophet in the ${prophet.book} width="280" height="280">
        <h2>${prophet.name}</h2>
        <p>${prophet.description}</p>
    `;
    } else {
        card.innerHTML = `
        <img src="images/${prophet.image}" alt="picture of ${prophet.name} the prophet in the ${prophet.book} width="280" height="280" loading="lazy">
        <h2>${prophet.name}</h2>
        <p>${prophet.description}</p>
    `;
    }



    prophet.verses.forEach((verse) => {
        const p = document.createElement('p');
        p.textContent = verse;
        card.appendChild(p);
    })

    showProphets.appendChild(card);
}

dataToDOM(url);