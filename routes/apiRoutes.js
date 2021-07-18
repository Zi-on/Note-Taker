const dataBase = require("../db/db.json");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
let notes = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json" ), "utf8"));
module.exports = (app) => {
  app.get("/api/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "..", "db/db.json"))
  );
  app.get("/api/notes", (req, res) => res.json(db));
  app.get("/api/notes/:id", (req, res) => {
    res.json(notes[req.params.id]);
    res.json(true);
  });

  // fs.readFile("db/db.json", (err, data) => {
  //   if (err) throw err;
  //   notes = JSON.parse(data);
  //   console.log(notes);
  // });

  app.post("/api/notes", (req, res) => {
    newNote = req.body;

    newNote.id = uuidv4();
    notes.push(newNote);
    fs.writeFile("db/db.json", JSON.stringify(notes, "/n"), (err) => {
      if (err) throw err;
    });
    res.json(newNote);
  });

  app.delete("/api/notes/:id", (req, res) => {
    deleteNote(req.params.id, notes);
    res.json(true);
    console.log(req.params.id);
  });

  function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
      let note = notesArray[i];

      if (note.id == id) {
        notesArray.splice(i, 1);
        fs.writeFileSync(
          path.join(__dirname, "..", "db/db.json"),
          JSON.stringify(notesArray, null, 2)
        );
      }
    }
  }
};
