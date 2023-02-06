var express = require('express');
var router = express.Router();
module.exports = router;
const model = require('./../database');
const fs = require('fs');
const { getAllContainer } = require('./../database');
const { error } = require('console');


router.use("/static", express.static('public'));

router.get('/', (req, res) => {
    fs.readFile('./public/Watertracking.html', null, function(error, page) {
        if (error) {
            res.writeHead(404);
            res.write("Page not found!")
        } else {
            model.getAllContainer().then(
                containers => {
                    console.log(containers)
                },
                error => {
                    console.log('ERROR');
                }
            )
            res.write(page);
        }
        res.end();
    });
});

router.post('/init', (req, res) => {
    model.initDummyData().then(
        containers => {
            console.log(containers)
        },
        error => {
            console.log('ERROR');
        }
    )
});

router.get('/overview', function(req, res) {
    fs.readFile('./public/overview.html', null, function(error, page) {
        if (error) {
            res.writeHead(404);
            res.write("Page not found!")
        } else {
            model.getAllContainer().then(
                containers => {
                    console.log(containers)
                },
                error => {
                    console.log('ERROR');
                }
            )
            res.write(page);
        }
        res.end();
    });
});

router.get('/data', function(req, res) {
    var results = model.getAllContainer().then(
        containers => {
            res.send(containers);
        },
        error => {
            console.log('ERROR');
        }
    )
});

router.get('/dataById', function(req, res) {
    var results = model.getContainerById().then(
        container => {
            res.send(container);
        },
        error => {
            console.log('ERROR');
        }
    )
});