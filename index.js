const express = require('express')
const app = express()
const CelestrackService = require('./backend/celestrack-service')
const port = 5000;

const celestrackService = new CelestrackService();

app.use('/', express.static(__dirname + '/public'));

app.get('/satellites', (req, res) => {
    const letter = req.query.letter;
    celestrackService.getSatellitesByFirstLetter(letter)
        .then(satellites => {
            res.send(JSON.stringify(satellites));
        })
})

app.get('/download-tle', (req, res) => {
    const satelliteNames = req.query.stl;
    celestrackService.getTLEBySatelliteNames(satelliteNames)
        .then(tle => {
            res.send(tle);
        })
})

app.listen(port, 'localhost')