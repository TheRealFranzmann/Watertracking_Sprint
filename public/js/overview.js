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
    window.location.href = '../static/Watertracking.html';
});

/*
// listener for add button
addBtn.addEventListener('click', event => {
    window.location.href = '../static/addForm.html';
});*/

var table = document.getElementById('beveragesTable');
async function createTableRows() {
  
    const rows = await fetch('http://localhost:5000/data')
        .then(response => response.json())
        .then(
            containers => {
                var row = '';

                for (var index = 0; index <= containers.length - 1; index++) {
                    (function (i) {
                        row = document.createElement('tr');
                        let rowName = document.createElement('td');
                        let rowAmount = document.createElement('td');
                        let rowUnit = document.createElement('td');
                        let deleteButton = document.createElement('img');

                        line = containers[i];
                        rowName.innerHTML = line.name;
                        rowAmount.innerHTML = line.amount;
                        rowUnit.innerHTML = line.unit;

                        deleteButton.src = "static/resource/delete.png";
                        deleteButton.title = "delete";
                        deleteButton.alt = "delete entry";
                        deleteButton.onclick = function () { fireDialog((line.id)); };

                        row.appendChild(rowName);
                        row.appendChild(rowAmount);
                        row.appendChild(rowUnit);
                        row.appendChild(deleteButton);
                        table.appendChild(row);
                    })(index);
                };

                if (containers.length == 0) { } // execute init

            },
            error => {
                console.log('ERROR');
            });
};

createTableRows();

async function fireDialog(id) {
    const data = await fetch(`http://localhost:5000/get/${id}`)
        .then(response => response.json())
        .then(
            item => {
                let text = `Do you want to delete this value? \n` +
                    `${item.name}: ${item.amount}`;
                if (confirm(text) == true) window.location.href = `/delete/${id}`;
            });
};
