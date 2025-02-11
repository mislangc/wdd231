import { verses } from '../data/verses.mjs';

// -------------------- Scripture
//const verseClose = document.querySelector('#verse-close');
const verseModal = document.querySelector('#verse-modal');
//const verseTitle = document.querySelector('#verse-title');
//const verseDescription = document.querySelector('#verse-description');
//const verseMinus = document.querySelector('#verse-minus');
//const verseReset = document.querySelector('#verse-reset');
const verseSection = document.querySelector('#verse-section');

// Filter buttons
const noFilter = document.querySelector('button.all');
const bomFilter = document.querySelector('button.book-of-mormon');
const bibleFilter = document.querySelector('button.bible');
const easyFilter = document.querySelector('button.easy');
const mediumFilter = document.querySelector('button.medium');
const hardFilter = document.querySelector('button.hard');

// Get element for showing last visit message using localStorage
const showLastVisit = document.querySelector('#show-last-visit');
const currentDate = new Date();
const lastVisitDate = localStorage.getItem("lastVisit");
const msToDays = 86400000;

if (lastVisitDate) {
    const msBetweenVisit = currentDate.getTime() - parseInt(lastVisitDate);
    const days = msBetweenVisit / msToDays;
    if (days < 1) {
        showLastVisit.textContent = "Back so soon! Awesome!"
    } else if (days > 1 && days < 2) {
        showLastVisit.textContent = `Welcome back! You last visited ${Math.floor(days)} day ago.`;
    } else {
        showLastVisit.textContent = `Welcome back! You last visited ${Math.floor(days)} days ago.`
    }
} else {
    showLastVisit.textContent = "Welcome! This is your first visit.";
}

localStorage.setItem("lastVisit", currentDate.getTime());

// Verse card elements code
verses.map(verseCards);

function switchFilter(value) {
    verseSection.innerHTML = "";
    let filtered;
    switch (value) {
        case 'all':
            verses.map(verseCards);
            break;
        case 'Book of Mormon':
            filtered = verses.filter(verse => verse.book === value);
            filtered.map(verseCards);
            break;
        case 'Bible':
            filtered = verses.filter(verse => verse.book === value);
            filtered.map(verseCards);
            break;
        case 'easy':
            filtered = verses.filter(verse => verse.difficulty === value);
            filtered.map(verseCards);
            break;
        case 'medium':
            filtered = verses.filter(verse => verse.difficulty === value);
            filtered.map(verseCards);
            break;
        case 'hard':
            filtered = verses.filter(verse => verse.difficulty === value);
            filtered.map(verseCards);
            break;
    }
}

noFilter.addEventListener('click', () => {
    switchFilter('all');
})

bomFilter.addEventListener('click', () => {
    switchFilter('Book of Mormon');
})

bibleFilter.addEventListener('click', () => {
    switchFilter('Bible');
})

easyFilter.addEventListener('click', () => {
    switchFilter('easy');
})

mediumFilter.addEventListener('click', () => {
    switchFilter('medium');
})

hardFilter.addEventListener('click', () => {
    switchFilter('hard');
})


//Create verse cards for every scripture verse in the imported verses object
function verseCards(verse) {
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    const button = document.createElement('button');

    h2.textContent = verse.title;
    p.innerHTML = `Difficulty: <span class="${verse.difficulty}">${verse.difficulty.toUpperCase()}</span>`;
    button.textContent = 'Memorize';
    button.addEventListener('click', () => {
        modalContent(verse);
    });

    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(button);

    verseSection.appendChild(div);
};

function modalContent(verse) {

    verseModal.innerHTML = '';

    const verseClose = document.createElement('button');
    const verseTitle = document.createElement('h2');
    const verseDescription = document.createElement('p');
    const verseMinus = document.createElement('button');
    const verseReset = document.createElement('button');

    verseClose.textContent = '❌';
    verseClose.addEventListener('click', () => {
        verseModal.close();
    })

    verseTitle.textContent = verse.title;

    const verseText = verse.description;
    let wordArray = verseText.split(" ");
    verseDescription.textContent = wordArray.join(" ");

    verseMinus.textContent = 'Add Blank';
    verseReset.textContent = 'Reset';

    verseMinus.addEventListener('click', () => {
        let count = 0;
        let nonBlanks = 0;

        // Check if word is blank. If word is not blank, add 1 to nonBlanks variable
        wordArray.forEach((word) => {
            if (!word.includes("_")) {
                nonBlanks += 1;
            }
        })

        // Do this code if there are words left
        if (nonBlanks > 0) {
            while (count < 1) {
                const randomNum = Math.floor(Math.random() * wordArray.length);
                const string = wordArray[randomNum];
                let blankString = '';
                if (!string.includes("_")) {
                    for (let i = 0; i < string.length; i++) {
                        blankString += "_";
                    }
                    wordArray[randomNum] = blankString;
                    count = 1;
                }
            };
            verseDescription.textContent = wordArray.join(" ");

            // If there are no more words left, alert the user
        } else {
            alert('There are no more words to filter.');
        }
    });

    // Reset button: restore all words in the scripture verse
    verseReset.addEventListener('click', () => {
        wordArray = verseText.split(" ");
        verseDescription.textContent = wordArray.join(" ");
    })

    verseModal.appendChild(verseClose);
    verseModal.appendChild(verseTitle);
    verseModal.appendChild(verseDescription);
    verseModal.appendChild(verseMinus);
    verseModal.appendChild(verseReset);

    verseModal.showModal();
};