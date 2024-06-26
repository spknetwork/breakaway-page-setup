const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});
app.get('*', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, () => {
    console.log('App listening on port ' + port);
});