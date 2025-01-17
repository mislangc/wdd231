// ------------------------------------------------------- Header
// --------------------- Hamburger Button

const hamMenu = document.querySelector('#ham-menu');
const hamButton = document.querySelector('#ham-button');

hamButton.addEventListener("click", () => {
    hamButton.classList.toggle('open');
    hamMenu.classList.toggle('open');
});