// ------------------------------------------------------- Main
// ---------- Get DOM weather sections elements

const weatherIcon = document.querySelector('#weather-icon');
const weatherDetails = document.querySelector('#weather-details');

// ---------- Get Openweather API data
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

    const temp = document.createElement('p');
    const desc = document.createElement('p');
    const high = document.createElement('p');
    const low = document.createElement('p');
    const humidity = document.createElement('p');
    const sunrise = document.createElement('p');
    const sunset = document.createElement('p');

    temp.innerHTML = `<strong>${Math.round(data.main.temp)}&deg;</strong> C`;
    desc.innerHTML = `${data.weather[0].description}`;
    high.innerHTML = `High: ${Math.round(data.main.temp_max)}&deg;`;
    low.innerHTML = `Low: ${Math.round(data.main.temp_min)}&deg;`;
    humidity.innerHTML = `Humidity: ${data.main.humidity}%`;

    const sunriseTime = new Date(data.sys.sunrise * 1000);
    sunrise.innerHTML = `Sunrise: ${sunriseTime.toLocaleTimeString([], { timeStyle: 'short' })}`;
    const sunsetTime = new Date(data.sys.sunset * 1000);
    sunset.innerHTML = `Sunset: ${sunsetTime.toLocaleTimeString([], { timeStyle: 'short' })}`;

    weatherDetails.appendChild(temp);
    weatherDetails.appendChild(desc);
    weatherDetails.appendChild(high);
    weatherDetails.appendChild(low);
    weatherDetails.appendChild(humidity);
    weatherDetails.appendChild(sunrise);
    weatherDetails.appendChild(sunset);
}


fetchApi();

// ---------- Get Members JSON and display to spotlights

const membersJSON = "data/members.json";
const spotlights = document.querySelector('#spotlights');

async function displayData(url) {
    const data = await getData(url);
    const membersSilverGold = data.filter((member) => member.membershipLevel === 2 || member.membershipLevel === 3);
    const randomThree = [];
    while (randomThree.length < 3) {
        const randomNum = Math.floor(Math.random() * membersSilverGold.length);
        const member = membersSilverGold[randomNum];
        const included = containsMember(member, randomThree);
        if (!included) {
            randomThree.push(member);
        }
    }
    console.log(randomThree);
    const cards = randomThree.map(makeCards);
    spotlights.innerHTML = cards.join("");
}

async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function makeCards(member) {
    let memberLevel;
    if (member.membershipLevel === 2) {
        memberLevel = 'Silver Member';
    } else if (member.membershipLevel === 3) {
        memberLevel = 'Gold Member';
    } else {
        memberLevel = 'Member';
    }

    return `<section class="member">
        <h2>${member.name}</h2>
        <p class="level">${memberLevel}</p>
        <div class="info">
            <img class="logo" src="${member.image}" alt="logo of ${member.name}">
            <div class="contacts">
                <p><strong>EMAIL:</strong> ${member.email}</p>
                <p><strong>PHONE:</strong> ${member.phoneNum}</p>
                <p><strong>URL:</strong> ${member.url}</p>
            </div>
        </div>
    </section>`


}

function containsMember(obj, list) {
    let i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }
    return false;
}

displayData(membersJSON);
