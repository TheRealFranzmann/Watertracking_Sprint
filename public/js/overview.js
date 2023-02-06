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


//listener for add button
addBtn.addEventListener('click', event => {
    window.location.href = '/addForm';
});


async function createTableRows() {

    const rows = await fetch('http://localhost:5000/data')
        .then(response => response.json())
        .then(
            containers => {
                var table = document.getElementById('beveragesTable');
                var row = '';
                for (var i = 0; i <= containers.length - 1; i++) {
                    line = containers[i];
                    row = document.createElement('tr');
                    let rowName = document.createElement('td');
                    let rowAmount = document.createElement('td');
                    let rowUnit = document.createElement('td');
                    let editLine = document.createElement('a');
                    editLine.href = '../static/edit_form.html?id=' + line.id;
                    let editPen = document.createElement('img');
                    editPen.src = '../static/resource/edit_icon.png';



                    console.log(line);
                    rowName.innerHTML = line.name;
                    rowAmount.innerHTML = line.amount;
                    rowUnit.innerHTML = line.unit;


                    row.appendChild(rowName);
                    row.appendChild(rowAmount);
                    row.appendChild(rowUnit);
                    row.appendChild(editLine);
                    editLine.appendChild(editPen);
                    table.appendChild(row);
                };

            },
            error => {
                console.log('ERROR');
            });
};

createTableRows();