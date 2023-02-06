const express = require("express");
const server = express();
const containerRoute = require('./routes/container')

const port = 5000;
const hostname = "localhost";

server.use('/', containerRoute);

server.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});