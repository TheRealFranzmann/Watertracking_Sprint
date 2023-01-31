// get the client
const mysql = require('mysql2');

// create the connection to database
connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "watertracking"
});

console.log('connected to watertracking');

// if table not exists
connection.query(
    'CREATE TABLE IF NOT EXISTS wassertrinken (id INT NOT NULL AUTO_INCREMENT , creationDate DATE NOT NULL , editDate DATE NOT NULL , name VARCHAR(255) NOT NULL , amount INT NOT NULL , unit VARCHAR(255) NOT NULL , PRIMARY KEY(id))',
    function (err, results, fields) {
        console.log(results);
    }
);

// post dummy data
function initDummyData() {
    connection.query(
        'INSERT INTO wassertrinken (id, creationDate, editDate, name, amount, unit)' + 
                    'VALUES' +
                    "('0030-01-01', '0030-01-01', hello, 100, world)," +
                    "('0030-01-01', '0030-01-01', hello, 100, world)",
        function (err, results, fields) {
            console.log(results);
        }
    );
}

module.exports = {
    initDummyData
}
