var express = require('express');
var router = express.Router()

<% services.forEach((service) => { %>
var <%= service %>Router = require('./<%= service %>Router');
<% }) %>


router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

<% services.forEach((service) => { %>
router.use(<%= service %>Router);
<% }) %>

module.exports = router