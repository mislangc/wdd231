// ------------------------------------------------------- Footer
// ---------- Get current year
const currentYear = document.querySelector('#current-year');

const date = new Date();
currentYear.textContent = date.getFullYear();

// ---------- Get last modification date
/*
const lastModificationDate = document.querySelector('#last-modif');

const modifDate = new Date(document.lastModified);
lastModificationDate.innerHTML = `${modifDate.toLocaleDateString()} ${modifDate.toLocaleTimeString()}`;
*/