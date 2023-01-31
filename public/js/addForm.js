// variables

var beverageName = document.getElementById('name').value;
var amount = document.getElementById('amount').value;
var unit = document.getElementById('unit').value;
const backBtn = document.getElementById('backBtn');
const submitBtn = document.getElementById('submitBtn');
document.getElementById('form').addEventListener('submit', validateForm);

// functions

function validateForm(event) {
    if (beverageName === '' || amount === '' || unit === '') {
        alert('Please fill out all fields!');
        event.preventDefault;
    }
}

function insertInto() {

}

// listener

backBtn.addEventListener('click', event => {
    window.location.href = '../overview.html';
});