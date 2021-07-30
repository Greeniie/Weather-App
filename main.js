const api = {
    key: "e5cc78f5346e54857b1efcd75798c07a",
    base: "https://api.openweathermap.org/data/2.5/"
}

const submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', setQuery);
const searchBox = document.querySelector('.search-box')


function setQuery() {
    getResults(searchBox.value)
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json()
        }).then(displayResults)
}

function displayResults(weather) {
    console.log(weather)
    let city = document.querySelector('.city')
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    date = document.querySelector('.date')
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span`

    let weatherElement = document.querySelector('.weather')
    weatherElement.innerText = weather.weather[0].main

    let weatherDescription = document.querySelector('.weather-desc')
    weatherDescription.innerText = weather.weather[0].description

    let locationIcon = document.querySelector('.weather-icon');
    const icon = weather.weather[0].icon
    locationIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@4x.png"></img>`

    let hiLow = document.querySelector('.hi-low')
    hiLow.innerHTML = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July",
     "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday",
     "Thursday", "Friday", "Saturday"]

   let day = days[d.getDay()];
   let date = d.getDate();
   let month = months[d.getMonth()];
   let year = d.getFullYear();
   return `${day} ${date} ${month} ${year}`;

}
