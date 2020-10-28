import { mapService } from './services/mapService.js';
import { locationService } from './services/locationService.js'

var gMap;
var gMarkers = [];
console.log('Main!');

mapService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    initMap()
        .then(() => {

            addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        // .catch(console.log('INIT MAP ERROR'));

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

document.querySelector('.location-copy').addEventListener('click', () => {
    let pos = {
            lat: gMarkers[0].getPosition().lat(),
            lng: gMarkers[0].getPosition().lng()
        }
        // console.log(pos);
    locationService.saveLocation(pos);
})



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
    console.log('addMarker:', google.maps.MapType);
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