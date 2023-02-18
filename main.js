'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function(data){

    const countryImg = document.querySelector('.country__img');
    const countryName = document.querySelector('.country__name');
    const countryRegion = document.querySelector('.country__region');
    const population = document.querySelector('.population')
    const capital = document.querySelector('.capital')
    const timezones = document.querySelector('.timezones')

    countryImg.src = `${data[0].flags.png}`;
    countryName.textContent = `${data[0].name.official}`;
    countryRegion.textContent = `${data[0].continents[0]}`;
    population.textContent = `👫 ${(+data[0].population / 100000).toFixed(1)} m.`;
    capital.textContent = `🏙️ ${data[0].capital}`;
    timezones.textContent = `🕒 ${data[0].timezones[0]}`;
}

const getCountryData = function(country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            renderCountry(data)
            const [lat, lon] = data[0].latlng;
            renderMap(lat, lon, data);
        })
}

// MAP DISPLAY

let map, map2;

const renderMap = function(lat, lon, data) {
    // check if map instance already exists, otherwise create new instance
    if (!map) {
        map = L.map('map').setView([lat, lon], 5);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([lat, lon]).addTo(map)
        .bindPopup(`Welcome to : ${data[0].name.official}`)
        .openPopup();
    }

    // update map center and marker location
    map.setView([lat, lon], 5);
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            layer.setLatLng([lat, lon])
                .bindPopup(`Welcome to : ${data[0].name.official}`)
                .openPopup();
        }
    });

    // check if map2 instance already exists, otherwise create new instance
    if (!map2) {
        map2 = L.map('map2').setView([lat, lon], 5);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map2);

        L.marker([lat, lon]).addTo(map2)
        .bindPopup(`Welcome to : ${data[0].name.official}`)
        .openPopup();
    }

    // update map2 center and marker location
    map2.setView([lat, lon], 5);
    map2.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            layer.setLatLng([lat, lon])
                .bindPopup(`Welcome to : ${data[0].name.official}`)
                .openPopup();
        }
    });
}

const input = document.querySelector('.my-input');

input.addEventListener('change', (event) => {
    const value = event.target.value;
    event.target.value = ''; 
    event.target.focus(); 
    getCountryData(value);
});

getCountryData('japan');
