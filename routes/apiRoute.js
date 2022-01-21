const express = require('express');
const fs = require("fs");
// const notes = require("./db/db.json")

const app = express();



app.get('/api/notes', (req, res) =>
 fs.readFile("db/db.json", 'utf8', (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data)
    res.json(jsonData)  //save all notes as JSON
 }));



 app.post('/api/notes', (req, res) => {

 })
//push to array
 //response with array
 //

module.exports = app;


// app.delete