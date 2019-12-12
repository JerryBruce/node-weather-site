const request = require('request');



const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/714984dcbc690142f3c437558bb61674/${encodeURIComponent(latitude)}, ${encodeURIComponent(longitude)}`
    request({ url, json: true }, (error, {body}) => {

        if (error) {
            callback('Unable to connect to weather services', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try again', undefined)
        } else {
           callback(undefined,
               `${body.daily.data[0].summary} The high for today is ${body.daily.data[0].temperatureHigh} and the low is ${body.daily.data[0].temperatureLow}.
                It is currently ${body.currently.temperature} degrees. There is a ${body.currently.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast

