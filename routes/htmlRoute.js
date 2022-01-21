const express = require('express');
const path = require('path');


const app = express();

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html')) //.. is needed because these files are located one level up from the current routes folder

  //Methods on the res object
  //sendFile - sends files
  //.json - sends back json object or array
  //.send - send string or any data type
  
  //.status - used with sendFile or send -- used to modify the status code of the response
);


app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

module.exports = app;