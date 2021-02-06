# ACNH Dex
## Overview
ACNH Dex is a full stack application built with React ([Material-UI framework](https://material-ui.com/)), Node.js, and MongoDB.

It keeps track of users' collectibles in the video game Animal Crossing: New Horizons and displays missing collectibles for the current month. It consumes [ACNH API](https://github.com/alexislours/ACNHAPI).

ACNH Dex is hosted on Heroku at [https://acnh-dex.herokuapp.com/].

## Getting started
Create a .env file in the root directory and add a MONGODB_URI variable with your [MongoDB cluster connection string](https://docs.mongodb.com/guides/cloud/connectionstring/).

Run the following commands:

`npm i`

`npm run start`<br />
Starts Node.js server on port 5000.

`npm run start-app`<br />
Starts React app in development mode.
Open [http://localhost:3000] to view it in the browser.
