const hamButton = document.querySelector('#ham-button');
const hamMenu = document.querySelector('#animate-me');

hamButton.addEventListener('click', () => {
    hamMenu.classList.toggle('open');
    hamButton.classList.toggle('open');
});
