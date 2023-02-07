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

connection.query(
    'CREATE TABLE IF NOT EXISTS container (id INT NOT NULL AUTO_INCREMENT , creationDate DATE NOT NULL , editDate DATE NOT NULL , name VARCHAR(255) NOT NULL , amount INT NOT NULL , unit VARCHAR(255) NOT NULL , PRIMARY KEY(id))',
    function (err, results, fields) {
        console.log(results);
    }
);

function remove(id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM `container` WHERE id = ?;';
        connection.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
}

function getAllContainer() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM `container`';
        connection.query(query, (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                if (results.length < 1) initDummyData();
                resolve(results);
            }
        });
    });
}

function getContainerById(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM `container` WHERE id = ?';
        connection.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
}

function insertContainer(container) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO `container` (creationDate, editDate, name, amount, unit) VALUES (?, ?, ?, ?, ?)';
        connection.query(query, [new Date(), new Date(), container.name, container.amount, container.unit], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function updateContainer(container) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE `container` SET editDate = ?, name = ?, amount = ?, unit = ? WHERE id = ?';
        connection.query(query, [new Date(), container.name, container.amount, container.unit, container.id], (error,
            results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function initDummyData() {
    return new Promise((resolve, reject) => {
        // INSERT INTO container (creationDate, editDate, name, amount, unit) VALUES ('0030-01-01', '0030-01-01', 'glass', 330, 'ml'), ('0030-01-01', '0030-01-01', 'mug', 250, 'ml');
        const query = 'INSERT INTO container (creationDate, editDate, name, amount, unit)' +
            'VALUES' +
            "('0030-01-01', '0030-01-01', 'glass', 330, 'ml')," +
            "('0030-01-01', '0030-01-01', 'mug', 250, 'ml');";
        connection.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
}

module.exports = {
    initDummyData,
    getAllContainer,
    get(id) {
        return getContainerById(id)
    },
    delete(id) {
        return remove(id)
    },
    save(container) {
        if (!container.id) {
            return insertContainer(container);
        } else {
            return updateContainer(container);
        }
    }
};