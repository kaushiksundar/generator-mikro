var express = require('express');
var app = express();
var router = require('./routers/router')
var bodyParser = require('body-parser');

const config = require('./config');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Simple API Gateway")
})

app.use(router)

console.log(`Simple API Gateway run on localhost:${config.PORT}`)

app.listen(config.PORT);