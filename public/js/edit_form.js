var nameField = document.getElementById('name');
var amount = document.getElementById('amount');
var unit = document.getElementById('unit');
var cancel = document.getElementById('cancel');
var submit = document.getElementById('submit');
const urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id');
idInput = document.createElement('input');
idInput.type = 'hidden';
idInput.id = 'id';
idInput.name = 'id';
idInput.value = id;
const form = document.getElementById('editForm');


function fillEditForm() {
    var container = fetch('http://localhost:5000/dataById/' + id)
        .then(response => response.json())
        .then(
            container => {
                nameField.value = container.name;
                amount.value = container.amount;
                unit.value = container.unit;
                form.appendChild(idInput);
            },
            error => {
                console.log('ERROR');
            }
        );
};

cancel.addEventListener('click', e => {
    window.location.href = '/overview';
});

fillEditForm();