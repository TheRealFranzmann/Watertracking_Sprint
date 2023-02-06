var express = require('express');
var router = express.Router();
module.exports = router;
const model = require('./../database');
const fs = require('fs');
const { getAllContainer } = require('./../database');


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
    model.initDummyData();
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
})

router.get("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    model.delete(id);
    res.writeHead(302, {
        location: '/overview', 'content-type': 'text/plain'
    });
    res.end('302 Redirecting to /overview');
});

router.get("/get/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    model.get(id).then(
        line => {
            res.send(line);
        },
        error => res.send("error")
    );
});
