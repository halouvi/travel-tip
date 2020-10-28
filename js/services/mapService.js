export const mapService = {
    getLocs,
    getLocationName,
    getLocationCoord
}

var locs = [{ lat: 11.22, lng: 22.11 }]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


function getLocationCoord(address) {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
            if (status === "OK") {
                resolve(results)
            } else {
                reject('Geocode was not successful for the following reason: ' + status);
            }
        });
    })
}

function getLocationName(location) {
    const geocoder = new google.maps.Geocoder();
    return new Promise(resolve => {
        geocoder.geocode({ location }, (results, status) => {
            if (status === "OK") {
                var locName = results[0].formatted_address;
                resolve(locName);
            }
        })
    });
}