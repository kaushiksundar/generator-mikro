var express = require('express');

var app = express();

var bodyParser = require('body-parser');

const config = require('./config');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/microservice_1', (req, res) => {
    
    res.send("Microservice 1 is up!")
})

app.listen(config.PORT);