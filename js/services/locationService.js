'use strict';

export const locationService = {
    saveLocation,
    findLocByID,
    deleteLocation
}

var gLocations = [];
// { id, name, lat, lng, weather, createdAt, updatedAt }

// function createLoc({ id, name, lat, lng, weather, createdAt, updatedAt }) {

// }
function saveLocation(loc) {
    gLocations.push({
        id: makeId(),
        name: loc.name,
        lat: loc.lat,
        lng: loc.lng
    })
    return Promise.resolve(gLocations)
}

function findLocByID(id) {
    var locIdx = gLocations.findIndex(loc => loc.id === id);
    return Promise.resolve(gLocations[locIdx])
}

function deleteLocation(id) {
    var locIdx = gLocations.findIndex(loc => loc.id === id);
    gLocations.splice(locIdx, 1)
    return Promise.resolve(gLocations)
}

function getLocationByLat() {
    // console.log(gLocations.lat)
    return gLocations.lat;
}

function getLocationByLng() {
    return gLocations.lng;
}



function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}