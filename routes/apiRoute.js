const express = require('express');
const fs = require("fs");
const notes = require("./db/db.json")

const app = express();



app.get('/api/notes', (req, res) =>
 fs.readFile(notes, (err, data) => {
    res.json(data)  //save all notes as JSON

    
 }));



 app.post
//push to array
 //response with array
 //

module.exports = app;


// app.delete