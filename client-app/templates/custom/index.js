var express = require('express');

var app = express();

var bodyParser = require('body-parser');

const config = require('./config');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + './public/index.html');
})

app.listen(config.PORT);