## Travel App
This application offers an easy way to log your trips - past and future! Simply enter the name of your destination and dates of travel, and the app will provide a picture and weather information.

The app includes options to save trips to your log and delete trips you no longer want there.

## Technologies Used
- HTML
- CSS
- Sass
- vanilla JavaScript
- Webpack
- Service Worker
- Express.js
- Node.js
- Jest

## Setup and Installation - Instructions for Developers:
To use this app locally, clone this repo. Then install dependencies with `npm install` terminal command.

Start the server with the following terminal command: `npm start`.

To run the client in production mode, use the following build command: `npm run build-prod`.

If you want to run the client in development mode, use `npm run build-dev`.

**NB in order to run this app, you will need three API keys. All are free and easy to get by signing up at the following websites:

- GeoNames: http://www.geonames.org/export/web-services.html
- Weatherbit: https://www.weatherbit.io/account/create
- Pixabay: https://pixabay.com/api/docs/

Store all three API keys in an .env file in the root directory. A model (without key) is included in .sample-env for easy reference. Simply add your id and key after the respective equals signs.

## About
I built this app to practice working with Web APIs, asynchronous code, and build tools. The app uses three external API's - Geonames, Weatherbit, and Pixabay - to gather data and it dynamically updates UI, based on user input.
