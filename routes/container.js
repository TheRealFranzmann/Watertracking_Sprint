var express = require('express');
var router = express.Router();
module.exports = router;
const model = require('./../database');
const fs = require('fs');
//const { getAllContainer } = require('./../database');
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

router.get('/dataById/:class', function(req, res) {
    var results = model.get(req.params.class).then(
        container => {
            res.send(container);
        },
        error => {
            console.log('ERROR');
        }
    )
});

router.post('/save', function(req, res) {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, beverage, files) => {
        console.log(beverage);
        model.save(beverage).then(
            beverage => {
                res.writeHead(302, {
                    location: '/overview',
                    'content-type': 'text/plain'
                });
                res.end('302 Redirecting to /overview');
            },
            error => res.send(error)
        );
    });
});