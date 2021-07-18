const express = require('express');
const path = require('path');
const app = express();



app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

require('./routes/apiRoutes')(app);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`);
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','notes.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','index.html'));
  });
