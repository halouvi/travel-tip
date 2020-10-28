import { mapService } from './services/mapService.js';
import { locationService } from './services/locationService.js'

var gMap;
var gMarkers = [];
// console.log('Main!');
mapService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    initMap()
        .then(() => {

            addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(console.log('INIT MAP ERROR'));

    getPosition()
        .then(pos => {

            // console.log('User position is:', pos.coords);
        })
        .catch(err => {
            // console.log('err!!!', err);
        })
}

document.querySelector('.btn').addEventListener('click', (ev) => {
    // console.log('Aha!', ev.target);
    panTo(35.6895, 139.6917);
})


// returns me back in place
document.querySelector('.my-location').addEventListener('click', (ev) => {
    // console.log('Aha!', ev.target);
    return
    // panTo(35.6895, 139.6917);
})

document.querySelector('.location-copy').addEventListener('click', () => {
    let pos = {
        lat: gMarkers[0].getPosition().lat(),
        lng: gMarkers[0].getPosition().lng()
    }
    getLocationName(pos)
        .then((name) => {
            pos.name = name;
            console.log('pos: ', pos);
            locationService.saveLocation(pos);
        });
})

function getLocationName(location) {
    // debugger
    const geocoder = new google.maps.Geocoder();
    return new Promise(resolve => {
        geocoder.geocode({ location }, (results, status) => {
            if (status === "OK") {
                // console.log(results[0].formatted_address)
                //         if (results[0]) {
                //             map.setZoom(11);
                //             const marker = new google.maps.Marker({
                //                 position: latlng,
                //                 map: map,
                //             });
                //             infowindow.setContent(results[0].formatted_address);
                //             infowindow.open(map, marker);
                //         } else {
                //             window.alert("No results found");
                //         }
                //     } else {
                //         window.alert("Geocoder failed due to: " + status);
                //     }
                // }
                var locName = results[0].formatted_address;
                // console.log(locName);
                // return Promise.resolve(locName)
                resolve(locName);
            }
        })
    });
}



export function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                    center: { lat, lng },
                    zoom: 15
                })
            gMap.addListener('click', (mapsMouseEvent) => {
                var newPos = mapsMouseEvent.latLng.toJSON();
                deleteMarkers();
                addMarker(newPos);
            })
            console.log('Map!', gMap);
        })
}


// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (let i = 0; i < gMarkers.length; i++) {
        gMarkers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    gMarkers = [];
}

function addMarker(loc) {
    const newMarker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    gMarkers.push(newMarker)
        // console.log('addMarker:', google.maps.MapType);
    return newMarker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyC1IyV2W9PZTl0fv2-1SUzT6Kz6X9LC1do'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}


function _connectWheatherApi(lat = 32.0749831, lon = 34.9120554) {
    const API_key = 'd5b56bcdb355950cf8bbe7c58955ddf8';
    // return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=32.0749831&lon=34.9120554&appid=d5b56bcdb355950cf8bbe7c58955ddf8`)
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`)
        .then(res => res);
}
getWheather()


/**return nname_country, weahter and humidity for lat&long**/
function getWheather() {
    // console.log(locationService.getLocationByLat)
    let lat = 32.0749831;
    let lon = 34.9120554;
    // let lat = 32.0749831;
    // let lon = 28.9120554;
    _connectWheatherApi(lat, lon)
        .then(ans => {
            // console.log('ans.weahter.description:', typeof ans.data.weather)
            let weahter = ans.data.weather[0].description;
            let humidity = ans.data.main.humidity;
            let country = ans.data.sys.country;
            renderWheather(weahter, humidity, country);
        })
        .catch(err => {
            console.log('Error:', err)
        })
}

function renderWheather(weahter, humidity, country) {
    document.querySelector('.weather').innerHTML = `<h2> ${country} </h2> <h3>${weahter}</h3> <h3>humidity:${humidity}%</h3>`;
}








//
const geocoder = new google.maps.Geocoder();
document.querySelector(".go-to").addEventListener("click", () => {
    geocodeAddress(geocoder, gMap);
});

function geocodeAddress(geocoder, resultsMap) {
    const address = document.querySelector(".location-input").value;
    return new Promise(geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
            resultsMap.setCenter(results[0].geometry.location);
            new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
            });
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    }));
}