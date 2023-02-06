var express = require('express');
var router = express.Router();
module.exports = router;
const model = require('./../database');
const fs = require('fs');

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

