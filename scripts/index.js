// ---------------------------- Get elements from the document

let currentYear = document.querySelector('#currentyear');
let lastModified = document.querySelector('#lastModified');
let myCourses = document.querySelector('#courses');
let totalCredits = document.querySelector('#total-credits');

let allButton = document.querySelector('#all-button');
let cseButton = document.querySelector('#cse-button');
let wddButton = document.querySelector('#wdd-button');
let hamButton = document.querySelector('#hamburger-button');
let menu = document.querySelector('#menu');


// ---------------------------- Get Current Year

let date = new Date();
currentYear.innerHTML = `&copy; ${date.getFullYear()}`;

// ---------------------------- Last Modified Date

lastModified.innerHTML = `Last Modified: ${new Date(document.lastModified).toLocaleString()}`;

// ---------------------------- Course List

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

// ---------------------------- Render courses to document

function courseCompleted(course) {
    totalCredits.textContent = parseInt(totalCredits.textContent) + course.credits;

    if (course.completed === true) {
        let courseCard = `<p class="completed"> ${course.subject} ${course.number}</p>`
        return courseCard
    } else {
        let courseCard = `<p> ${course.subject} ${course.number}</p>`
        return courseCard
    }
}

myCourses.innerHTML = courses.map(courseCompleted).join("");

// ---------------------------- Event Listeners

function displayCSECourses(course) {
    totalCredits.textContent = 0;
    let cseCourses = courses.filter(course => course.subject.charAt(0) === "C");
    myCourses.innerHTML = cseCourses.map(courseCompleted).join("");
}

function displayWDDCourses(course) {
    totalCredits.textContent = 0;
    let wddCourses = courses.filter(course => course.subject.charAt(0) === "W");
    myCourses.innerHTML = wddCourses.map(courseCompleted).join("");
}

function displayAllCourses(course) {
    totalCredits.textContent = 0;
    myCourses.innerHTML = courses.map(courseCompleted).join("");
}

cseButton.addEventListener("click", displayCSECourses);
wddButton.addEventListener("click", displayWDDCourses);
allButton.addEventListener("click", displayAllCourses);

// ---------------------------- Hamburger Button

hamButton.addEventListener("click", () => {
    hamButton.classList.toggle("active");
    menu.classList.toggle('active');
})

// ---------------------------- Display Weather

const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#weather-desc');
const weatherTemp = document.querySelector('#weather-temp');
const weatherCity = document.querySelector('#weather-city');

const myKey = '6ef108ae00230e29d53effdbcf53b2cd'
const cityLatitude = '15.477726577945443';
const cityLongitude = '120.59378142540841';
const tempUnit = 'metric';

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLatitude}&lon=${cityLongitude}&units=${tempUnit}&appid=${myKey}`;

async function fetchApi() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error)
    }
}

function displayWeather(data) {
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);

    weatherDesc.textContent = data.weather[0].description;

    weatherTemp.innerHTML = `${data.main.temp}&deg;C`;

    weatherCity.textContent = data.name;
}

fetchApi();