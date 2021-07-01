const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const docrootPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

//setup heroku port number
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(docrootPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Forecast',
        name: 'Mario'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a sample help text.',
        name: 'Mario'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Mario'
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(address){
        geocode(address, (error, {location, latitude, longitude} = {}) => {
            if(error){
                return res.send({error});
            }
    
            forecast(latitude, longitude, (error, {weather_description, temperature, feelslike, humidity} = {}) => {
                if(error){
                    return res.send({error});
                }
                var forecast = weather_description + " in " + address + ": it is now " + temperature + " degrees out and it feels like " + feelslike + " degrees out. The humidity is " + humidity + "%.";
            
                res.send({
                    latitude,
                    longitude,
                    location,
                    forecast
                })
            })
    
        });
    } else {
        res.send({ error: 'You must provide a location.' });    
    }
});

app.get('/help/*', (req, res) => {
    res.render('pagenotfound', {
        title: '404',
        message: 'Help article not found.',
        name: 'Mario'
    });
});

app.get('*', (req, res) => {
    res.render('pagenotfound', {
        title: '404',
        message: 'The requested page does not exist.',
        name: 'Mario'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.');
});