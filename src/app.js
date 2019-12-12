const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT  || 3000

//Express Paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Handlebars Configuration
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Static Directory
app.use(express.static(publicDirectoryPath))


//Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jerry Bruce'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jerry Bruce'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: '',
        title: 'Help',
        name: 'Jerry Bruce'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

//404 Errors
app.get('/help/*', (req, res) => {
    res.render('404Error', {
        title: '404',
        name: 'Jerry Bruce',
        message: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404Error', {
        title: '404',
        name: 'Jerry Bruce',
        message: 'Page not found.',
    })
})

//Listen
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})