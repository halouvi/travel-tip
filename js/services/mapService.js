export const mapService = {
    getLocs,
    getLocationName
}

var locs = [{ lat: 11.22, lng: 22.11 }]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function getLocationName(location) {
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