const express = require("express");
const server = express();
const fs = require('fs');

const { initDummyData } = require('./database');

const port = 5000;
const hostname = "localhost";

server.use(express.static('./public'));

server.get('/', (req, res) => {
    fs.readFile('./public/Watertracking.html', null, function(error, page) {
        if (error) {
            res.writeHead(404);
            res.write("Page not found!")
        } else {
            res.write(page);
        }
        res.end();
    });
});

server.post("/init", (req, res) => {
    initDummyData();
});

server.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});