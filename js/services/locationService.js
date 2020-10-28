'use strict';

export const locationService = {
    saveLocation,
    gLocations
}

var gLocations = [];
// { id, name, lat, lng, weather, createdAt, updatedAt }

// function createLoc({ id, name, lat, lng, weather, createdAt, updatedAt }) {

// }
function saveLocation(loc) {
    console.log(loc);
    gLocations.push({
        id: makeId(),
        lat: loc.lat,
        lng: loc.lng
    })
    console.log(gLocations)
}


function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}