// variables
const connection = require('./database.js');
var beverageName = document.getElementById('name').value;
var amount = document.getElementById('amount').value;
var unit = document.getElementById('unit').value;
const backBtn = document.getElementById('backBtn');
const submitBtn = document.getElementById('submitBtn');
document.getElementById('form').addEventListener('submit', validateForm);

// functions

function validateForm(event) {
    if (beverageName.value === '' || amount.value === '') {
        alert('Please fill out all fields!');
        event.preventDefault;
    }
}

// listener

submitBtn.addEventListener('click', event => {
    connection.insertContainer();
});
backBtn.addEventListener('click', event => {
    window.location.href = '../overview.html';
});