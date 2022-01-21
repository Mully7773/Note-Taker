const express = require('express');
const fs = require("fs");
const unid = require('../helper/unid');

// const notes = require("./db/db.json")

const app = express();



app.get('/api/notes', (req, res) =>
 fs.readFile("db/db.json", 'utf8', (err, data) => {
    if (err) throw err;
    const jsonNotes = JSON.parse(data)
    res.json(jsonNotes)  //save all notes as JSON

    
 }));



 app.post('/api/notes', (req, res) => {
   console.log(req.body.title);
   console.log(req.body.text);
   // const noteTitle = req.body.title
   // const noteText = req.body.text
   const { title, text } = req.body;

   if (title && text) {
      const newNote = {
         title,
         text,
         note_id: unid(),
      };
      
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
         if (err) {
            console.log(err);
         } else {
            let parsedNotes = JSON.parse(data)

            parsedNotes.push(newNote);
         
         //also tried writeFile
         fs.writeFileSync(
            './db/db.json', JSON.stringify(parsedNotes, null, 4), "utf8",
            (writeErr) => 
               writeErr
               ? console.error(writeErr)
               : console.info("Successfully wrote note!")
         )
       }
      })
   }
 })


 app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    res.send("Delete request called")
 })
//push to array
 //response with array
 //

//  fs.writeFile("db/db.json", JSON.stringify(jsonData), (err) => {
//    err 
//      ? console.log(err)
//      : console.log("Note taken")
//    })

module.exports = app;


// app.delete