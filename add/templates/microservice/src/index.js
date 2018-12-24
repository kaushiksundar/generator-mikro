var express = require('express');

var app = express();

var bodyParser = require('body-parser');

const config = require('./config');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/<%= name %>', (req, res) => {
    
    res.send("<%= name %> - Microservice is up!")
})

app.listen(config.PORT);