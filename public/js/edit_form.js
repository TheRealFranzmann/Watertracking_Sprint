const { response } = require("express");

var name = document.getElementById('name');
var amount = document.getElementById('amount');
var unit = document.getElementById('unit');

async function fillEditForm() {
    const container = await fetch('http://localhost:5000/dataById')
    .then(response => response.json())
    .then(
        container => {
            name.innerHTML = container.name;
            amount.innerHTML = container.amount;
            //unit.innerHTML = container.unit; -> datalist?
        }
    )
}