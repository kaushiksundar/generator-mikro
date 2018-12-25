var express = require('express');
var router = express.Router()
var schoolRouter = require('./microservice1Router')


router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(schoolRouter);

module.exports = router