const weather = document.querySelector(".js-weather");

const API_KEY = "9f3fe4d070f97ca121ef556a0a4d7054";
const COORDS = "coords";

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(respones){
        return respones.json();
    }).then(function(json){
        console.log(json);
        const temp = json.main.temp;
        const place = json.name;
        weather.innerText = `${temp} @ ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log("Cant access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords = JSON.parse(localStorage.getItem(COORDS));
    if(loadedCoords === null){
        askForCoords();
    }
    else {
        getWeather(loadedCoords.latitude, loadedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();