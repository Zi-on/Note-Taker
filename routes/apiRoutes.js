const db = require('../db/db.json');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
module.exports = (app) => {
    app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '../db/db.json')))
    app.get('/api/notes', (req, res) => res.json(db));
    app.get('/api/notes:id', (req, res) => {

     res.json(notes[req.params.id]);
     res.json(true);
    });

    fs.readFile("db/db.json", "utf8", (err, data) => {
        notes = JSON.parse(data);
        console.log(notes);
    });

    app.post('/api/notes', (req, res) => {
      newNote = req.body;
      console.log(newNote)
      newNote.id = uuidv4();
      notes.push(newNote);
      fs.writeFile("db/db.json",JSON.stringify(notes,'/n'),err => {
          if (err) throw err;
      });
      res.json(newNote)
    });

    app.delete('./api/notes:id', (req, res) => {
        noteId = req.params.id.toString();

        data = JSON.parse(fs.readFile("db/db.json", "utf8"));

        const newData = data.filter( notes => notes.id.toString() !== noteId);

        fs.watchFile('.db/db.json', JSON.stringify(newData, null));

        res.JSON(newData);
    });
}