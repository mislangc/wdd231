import { verses } from '../data/verses.mjs';

const showQuestion = document.querySelector('#show-question');
const choices = document.querySelector('form');

function getRandomQuestion(list) {
    const randomNum = Math.floor(Math.random() * list.length);

    showQuestion.innerHTML = `
        <h3>What scripture verse?</h3>
        <p>${list[randomNum].description}</p>
    `

    choices.innerHTML = "";

    const choicesList = [];

    //add the correct answer to the choicesList array and to localStorage
    choicesList.push(list[randomNum].title);
    localStorage.setItem("answer", list[randomNum].title);

    //fill random choices to the choicesList array
    while (choicesList.length < 4) {
        const randomIndex = Math.floor(Math.random() * list.length);
        const verseTitle = list[randomIndex].title;
        const included = checkIfIncluded(verseTitle, choicesList);
        if (!included) {
            choicesList.push(verseTitle);
        }
    }

    // Jumble choicesList array
    for (let i = choicesList.length - 1; i > 0; i--) {

        // Generate random index 
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements at indices i and j
        const temp = choicesList[i];
        choicesList[i] = choicesList[j];
        choicesList[j] = temp;
    }

    // Make radio buttons and add it to form
    choicesList.forEach((verse) => {
        choices.innerHTML += `
            <label><input type="radio" name="choice" value="${verse}" required> ${verse}</label>
        `;
    })

    // Add a submit answer button
    choices.innerHTML += `
        <input type="submit" value="Submit Answer">
    `
}

function checkIfIncluded(item, list) {
    let i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === item) {
            return true;
        }
    }
    return false;
}

getRandomQuestion(verses);