'use strict';
const reqPromise = require('request-promise');

// Importing different modules from the Actions on Google client library.
const { dialogflow,
    BasicCard,
    Image
    } = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({ debug: true });

// City Intent
app.intent('City', (conv, { geocity }) => {

    // Calling our API
    const options = {
        url: `http://api.openweathermap.org/data/2.5/weather?q=${geocity}&appid=cdbcab96aa951d51be6eb3c1e73e0e1c`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };

    return reqPromise.get(options).then((res) => {

        conv.ask(`<speak>Here's the weather of ${geocity} <break time = "200ms"/></speak>`);
        conv.ask(`<speak>Temperature is ${Math.floor(res.main.temp - 273)} degree Celsius,<break time = "500ms"/> 
        ${res.weather[0].main} in ${geocity} \n\n <break time = "5000ms"/>Check another city
        </speak>`);


        if (res.weather[0].main == 'Clear') {

            // Create a basic card
            conv.ask(new BasicCard({
                text: `${res.weather[0].main}`,
                image: new Image({
                    url: 'http://tmglive.tv/wp-content/uploads/2017/06/Sunny-clear-weather.jpeg',
                    alt: 'Clear Sky'
                })
            }));

        } else if (res.weather[0].main == 'Rain') {

            // Create a basic card
            conv.ask(new BasicCard({
                text: `${res.weather[0].main}`,
                image: new Image({
                    url: 'https://www.scienceabc.com/wp-content/uploads/2015/05/Walking-in-Rain.jpg',
                    alt: 'Raining'
                }),
            }));

        } else if (res.weather[0].main == 'Clouds') {

            // Create a basic card
            conv.ask(new BasicCard({
                text: `${res.weather[0].main}`,
                image: new Image({
                    url: 'https://www.theglobeandmail.com/resizer/BGOzSdJP1VNRXJ9GCYbW9-VYtAk=/1200x0/filters:quality(80)/arc-anglerfish-tgam-prod-tgam.s3.amazonaws.com/public/5EG236O7RVH4LKH7RRD4SR5NPI',
                    alt: 'Clouds'
                }),
            }));

        } else if (res.weather[0].main == 'Haze') {

            //     // Create a basic card
            conv.ask(new BasicCard({
                text: `${res.weather[0].main}`,
                image: new Image({
                    url: 'https://www.healthhub.sg/sites/assets/Assets/Article%20Images/respiratory_haze.jpg?Width=970&Height=405',
                    alt: 'Haze'
                }),
            }));

        } else if (res.weather[0].main == 'Mist') {

            // Create a basic card
            conv.ask(new BasicCard({
                text: `${res.weather[0].main}`,
                image: new Image({
                    url: 'https://graffitiwallpaper.com/pics/listings/139_wide.jpg',
                    alt: 'Mist'
                }),
            }));

        }
        else if (res.weather[0].main == 'Thunderstorm') {

            // Create a basic card
            conv.ask(new BasicCard({
                text: `${res.weather[0].main}`,
                image: new Image({
                    url: 'http://images.skymetweather.com/content/wp-content/uploads/2016/04/Thundershowers-2.jpg',
                    alt: 'Thunderstorm'
                }),
            }));

        }
        else if (res.weather[0].main == 'Drizzle') {

            // Create a basic card
            conv.ask(new BasicCard({
                text: `${res.weather[0].main}`,
                image: new Image({
                    url: 'http://www.whitneydrake.com/wp-content/uploads/2012/11/drizzle-11292012.jpg',
                    alt: 'Thunderstorm'
                }),
            }));

    }
    }).catch((err) => {
        conv.close(`<speak> API server is not responding right now</speak>`);
    });
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
