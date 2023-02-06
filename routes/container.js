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

/*
router.get('/overview', (req, res) => {
    model.getAllContainer().then(
        containers => {
            res.send(getList(containers))
        },
        error => {
            console.log('ERROR');
        }
    )
})
*/

router.get('/overview', (request, response) => {
    const query = "SELECT * FROM users";
    connection.query(query,(error, results) => {
        if(error) throw error;

        let rows = "";
        results.array.forEach(row => {
            rows += "<tr>";
            rows += "<td>" + row.id + "</td>";
            rows += "<td>" + row.creationDate + "</td>";
            rows += "<td>" + row.editDate + "</td>";
            rows += "<td>" + row.name + "</td>";
            rows += "<td>" + row.amount + "</td>";
            rows += "<td>" + row.unit + "</td>";
            rows += "</tr>";
        });

        response.send(rows);
    });
});
