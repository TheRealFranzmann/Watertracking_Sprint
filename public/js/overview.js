/*
created by Kathrin Hubmann
24.01.2023
*/

// variables
var backBtn = document.getElementById('backBtn');
var list = document.getElementById('beveragesList');
var addBtn = document.getElementById('addBtn');
import { getOverviewData } from "../../routes/container";
var results = getOverviewData;

// listeners
backBtn.addEventListener('click', event => {
    window.location.href = 'Watertracking.html';
});

// listener for add button
addBtn.addEventListener('click', event => {
    window.location.href = '../addForm.html';
});

async function createTableRows(results) {

    var table = document.getElementById('beveragesTable');
    var row = '';
    let rowId;
    let rowCreationDate;
    let rowEditDate;
    let rowName;
    let rowAmount;
    let rowUnit;

    results.forEach(line => {

        rowId = line.id;
        rowCreationDate = line.creationDate;
        rowEditDate = line.editDate;
        rowName = line.name;
        rowAmount = line.amount;
        rowUnit = line.unit;

        row = document.createElement('tr');
        row.appendChild(rowId);
        row.appendChild(rowCreationDate);
        row.appendChild(rowEditDate);
        row.appendChild(rowName);
        row.appendChild(rowAmount);
        row.appendChild(rowUnit);
        table.appendChild(row);

    });
}

createTableRows();