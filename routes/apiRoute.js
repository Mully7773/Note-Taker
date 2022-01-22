const express = require('express');
const { acceptsEncodings } = require('express/lib/request');
const fs = require('fs');
const unid = require('../helper/unid');

const app = express();

app.get('/api/notes', (req, res) =>
 fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    const jsonNotes = JSON.parse(data)
    res.json(jsonNotes)  //save all notes as JSON 
 }));

 app.post('/api/notes', (req, res) => {
   console.log(req.body.title);
   console.log(req.body.text);
   
   const { title, text } = req.body;

   if (title && text) {
      const newNote = {
         title,
         text,
         id: unid(),
      };
      
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
         if (err) {
            console.log(err);
            res.send("Error!")
            .status(500);
            
         } else {
            let parsedNotes = JSON.parse(data)

            parsedNotes.push(newNote);
         
         fs.writeFile(
            './db/db.json', JSON.stringify(parsedNotes, null, 4), "utf8",
            (writeErr) => {
            if (writeErr) {
               res.status(500)
               .send("Something went wrong!")
            } else {
               res.send("Successfully wrote note!")
            }
         }
         )
       }
      })
   } else { res.send("Please fill in both fields!")
   .status(400);
   }
 })


 app.delete('/api/notes/:id', (req, res) => {
    const noteIndex = req.params.id;
    console.log(req.params.note_id);
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
       if (err) throw err;
       let deleteParsedNotes = JSON.parse(data);
       const noNotesArray = deleteParsedNotes.filter(note => {
          return note.id !== noteIndex
       });

       fs.writeFile('./db/db.json', JSON.stringify(noNotesArray), (err, data) => {
          console.log("Note deleted!")
          if (err) throw err;
       });
       res.json(noNotesArray);
    })
   }
 )  
module.exports = app;