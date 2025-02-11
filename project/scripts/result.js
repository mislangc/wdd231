const currentUrl = window.location.href;
const answer = localStorage.getItem('answer');

localStorage.removeItem('answer');

const everything = currentUrl.split('?');
let formData = everything[1].split('&');


function show(data) {
    formData.forEach((element) => {
        if (element.startsWith(data)) {
            result = element.split('=')[1].replace("%3A", ":");
            result = result.replaceAll("+", " ");
        }
    })
    return result;
}

const showInfo = document.querySelector('#quiz-result');

if (show('choice') === answer) {
    showInfo.innerHTML = `
    <p>✅ Correct!</p>
    <p>The answer was ${answer}</p>
`;
} else {
    showInfo.innerHTML = `
    <p>❌ Incorrect...</p>
    <p>The answer was ${answer}</p>
    <p>You answered ${show('choice')}</p>
`;
}



