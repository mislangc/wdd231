const hamButton = document.querySelector('#ham-button');
const hamMenu = document.querySelector('#animate-me');

hamButton.addEventListener('click', () => {
    hamMenu.classList.toggle('open');
    hamButton.classList.toggle('open');
});

// -------------------- Scripture

const versePlaceholder = document.querySelector('#verse-placeholder');
const verseMinus = document.querySelector('#verse-minus');
const verseReset = document.querySelector('#verse-reset');

const verse = `For God so loved the world that He gave His only Begotten Son, that whosoever believeth in him, should not perish, but have everlasting life.`
let wordArray = verse.split(" ");
versePlaceholder.textContent = wordArray.join(" ");

verseMinus.addEventListener('click', () => {
    let count = 0;
    let nonBlanks = 0;

    // Check if there are words left

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
        versePlaceholder.textContent = wordArray.join(" ");

        // If there are no more words left, alert the user

    } else {
        alert('There are no more words to filter.');
    }
});

// Reset button: restore all words in the scripture verse

verseReset.addEventListener('click', () => {
    wordArray = verse.split(" ");
    versePlaceholder.textContent = wordArray.join(" ");
})