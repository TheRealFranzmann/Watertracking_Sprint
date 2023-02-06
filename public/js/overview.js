/*
created by Kathrin Hubmann
24.01.2023
*/

// variables
var backBtn = document.getElementById('backBtn');
var list = document.getElementById('beveragesList');
var addBtn = document.getElementById('addBtn');


// listeners
backBtn.addEventListener('click', event => {
    window.location.href = 'Watertracking.html';
});

// listener for add button
addBtn.addEventListener('click', event => {
    window.location.href = '../addForm.html';
});


async function createTableRows() {

    const rows = await fetch('http://localhost:5000/data')
        .then(response => response.json())
        .then(
            containers => {
                var table = document.getElementById('beveragesTable');
                var row = '';

                for (var i = 0; i <= containers.length - 1; i++) {
                    row = document.createElement('tr');
                    let rowId = document.createElement('td');
                    let rowCreationDate = document.createElement('td');
                    let rowEditDate = document.createElement('td');
                    let rowName = document.createElement('td');
                    let rowAmount = document.createElement('td');
                    let rowUnit = document.createElement('td');

                    line = containers[i];
                    rowId.innerHTML = line.id;
                    rowCreationDate.innerHTML = line.creationDate;
                    rowEditDate.innerHTML = line.editDate;
                    rowName.innerHTML = line.name;
                    rowAmount.innerHTML = line.amount;
                    rowUnit.innerHTML = line.unit;

                    row.appendChild(rowId);
                    row.appendChild(rowCreationDate);
                    row.appendChild(rowEditDate);
                    row.appendChild(rowName);
                    row.appendChild(rowAmount);
                    row.appendChild(rowUnit);
                    table.appendChild(row);
                };

            },
            error => {
                console.log('ERROR');
            });
};

createTableRows();