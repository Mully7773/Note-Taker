const express = require('express');
const apiPath = require("./routes/apiRoute");
const htmlPath = require("./routes/htmlRoute");

const PORT = process.env.PORT || 3000;
const app = express();

//make front end available to back end
app.use(express.static('public'));

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route accessibility
app.use(apiPath);
app.use(htmlPath);

//Opening port
app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}!`);
});
