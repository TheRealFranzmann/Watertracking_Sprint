// variables

var beverageName = document.getElementById('name').value;
var amount = document.getElementById('amount').value;
var unit = document.getElementById('unit').value;
const backBtn = document.getElementById('backBtn');
const submitBtn = document.getElementById('submitBtn');

// functions

function validateForm() {
    if (beverageName === '' || amount === '' || unit === '') {
        alert('Please fill out all fields!');
        return false;
    }
    return true;
}

function insertInto() {

}

// listener

backBtn.addEventListener('click', event => {
    window.location.href = '../overview.html';
});

submitBtn.addEventListener('click', event => {
    validateForm();
    insertInto();
});