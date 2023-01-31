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
    'CREATE TABLE IF NOT EXISTS wassertrinken (date DATE NOT NULL, glas INT , krug INT, PRIMARY KEY(date))',
    function (err, results, fields) {
        console.log(results);
    }
);

// post dummy data
function initDummyData() {
    connection.query(
        'INSERT INTO wassertrinken (date, glas, krug)' + 
                    'VALUES' +
                    "('0030-01-01', 0, 1)," +
                    "('0030-01-02', 2, 3)," +
                    "('0030-01-03', 4, 5)," +
                    "('0030-01-04', 6, 7)," +
                    "('0030-01-05', 8, 9)," +
                    "('0030-01-06', 10,11)," +
                    "('0030-01-07', 12,13)",
        function (err, results, fields) {
            console.log(results);
        }
    );
}

module.exports = {
    initDummyData
}
