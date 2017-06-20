var fs = require("fs");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var dataPath = path.join(__dirname, 'data.json');
var clientPath = path.join(__dirname, '../client');

app.use(express.static(clientPath));
app.use(bodyParser.json());

app.get('/api/chirps', function (req, res) {
    res.sendFile(dataPath);
});

app.post('/api/chirps',function (req, res) {
    fs.readFile(dataPath, 'utf8', function (err, data) {
        var chirps = JSON.parse(data);
        var newChirps = req.body;
        chirps.push(newChirps);
        fs.writeFile(dataPath, JSON.stringify(chirps), function (err){
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
        })
    });
});

app.listen(3000);
