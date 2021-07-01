const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=c9ab1c750d72f05b69b948a6eeeb0c6c&units=m&query=" + latitude + "," + longitude;
    request({
        url,
        json: true
    }, (error, { body } = {}) => {
        //console.log(response);
        if(error){
            callback("Unable to connect to weather service.", undefined);    
        } else if(body.error){
            callback("Unable to retrieve weather data."), undefined;   
        } else {
            const current = body.current;
            const {temperature, feelslike} = current;
            callback(undefined, {
                weather_description: current.weather_descriptions[0],
                temperature,
                feelslike
            })
        }
    })
};

module.exports = forecast;