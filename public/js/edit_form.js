var nameField = document.getElementById('name');
var amount = document.getElementById('amount');
var unit = document.getElementById('units');
var cancel = document.getElementById('cancel');
var submit = getElementById('submit');
const urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id');

function fillEditForm() {
    var container = fetch('http://localhost:5000/dataById/' + id)
    .then(response => response.json())
    .then(
        container => {
            nameField.value = container.name;
            amount.value = container.amount;
            unit.value = container.unit;
        },
        error => {
            console.log('ERROR');
        }
    );
};

cancel.addEventListener('click', e => {
    window.location.href ='../static/overview.html';
});

submit.addEventListener('click', e => {
    e.preventDefault();
    
})

fillEditForm();