const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?limit=1&access_token=pk.eyJ1IjoiYW5uYWRvaXJhbSIsImEiOiJja3FjMWlsMG4wZGg1MnZwNnRkbnJxNmp5In0.t7z4CEKG5ah6S80iE9vI6A";
    request({
        url,
        json: true
    }, (error, { body } = {}) => {
        if(error){
            callback("Unable to connect to location service.", undefined);    
        } else if(body.error){
            callback("Unable to retrieve location data.", undefined);   
        } else if(body.features && body.features.length > 0){
            const feature = body.features[0];
            const latitude = feature.center[1];
            const longitude = feature.center[0];
            const location = feature.place_name;
            callback(undefined, {
                latitude, 
                longitude,
                location
            });
        } else {
            callback("Unable to find location.", undefined); 
        }
    })
};

module.exports = geocode;