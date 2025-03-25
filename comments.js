// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Read file
const readData = () => {
    const data = fs.readFileSync('data.json');
    return JSON.parse(data);
}

// Write file
const writeData = (data) => {
    fs.writeFileSync('data.json', JSON.stringify(data));
}

// Get all comments
app.get('/comments', (req, res) => {
    const data = readData();
    res.send(data);
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
    const data = readData();
    const id = req.params.id;
    const comment = data.find(comment => comment.id === id);
    res.send(comment);
});

// Add comment
app.post('/comments', (req, res) => {
    const data = readData();
    const comment = req.body;
    data.push(comment);
    writeData(data);
    res.send(data);
});

// Update comment
app.put('/comments/:id', (req, res) => {
    const data = readData();
    const id = req.params.id;
    const comment = req.body;
    const index = data.findIndex(comment => comment.id === id);
    data[index] = comment;
    writeData(data);
    res.send(data);
});

// Delete comment
app.delete('/comments/:id', (req, res) => {
    const data = readData();
    const id = req.params.id;
    const index = data.findIndex(comment => comment.id === id);
    data.splice(index, 1);
    writeData(data);
    res.send(data);
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
