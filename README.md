# Weight Tracker

[![Netlify Status](https://api.netlify.com/api/v1/badges/83d64573-4162-4124-8d80-ef0599c0cb0a/deploy-status)](https://app.netlify.com/sites/feather-weight/deploys)

Local storage option for saving your weight daily and tracking it over time.
Go to [Weight Tracker](https://bikingbadger.github.io/weight-tracker/) and start saving your data over time

## Behind the project

This is a little project for me to test out using Vanilla JS to test out local storage.
Because it's local I don't have to worry about credentials
I will update and optimize this to use the things I am learning during my courses on [Go Make Things](https://gomakethings.com)

At the moment I am using a third party graph. In the future I may try and use my own version.

## Install

```
npm install
```

## Development

Run the netlify functions, this will run the functions on port 9000.

```
npm run functions
```

To run the app run the `serve` script. This will use the Netlify functions as part of the `vue.config.js` to proxy the functions running in `http://localhost:9000` to the application port `http://localhost:8080`. This gives the ability of the application to use the functions as if they were running on the server.

```
npm run serve
```

