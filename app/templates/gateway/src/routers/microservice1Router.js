var express = require('express');
var router = express.Router()

const apiAdapter = require('./apiAdapter')
const baseURL = require('./baseURL');


const api = apiAdapter(baseURL.MICROSERVICE_1)

router.get('/microservice_1', (req, res) => {
  api.get(req.path).then(resp => {
    res.send(resp.data)
  })
});

module.exports = router