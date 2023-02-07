/*
created Bence Gacs
24.01.2023
*/
var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get("id");

var container = fetch('http://localhost:5000/dataById/' + id)
    .then(response => response.json())
    .then(
        container => {
            document.getElementById("containerName").innerHTML = container.name;
            document.getElementById("creationDate").innerHTML = container.creationDate;
            document.getElementById("editDate").innerHTML = container.editDate;
            document.getElementById("containerCapacity").innerHTML = container.amount;
            document.getElementById("unit").innerHTML = container.unit;
        },
        error => {
            console.log('ERROR');
        }
    );

// listeners
backBtn.addEventListener('click', event => {
    window.location.href = 'overview.html';
});

editBtn.addEventListener('click', event => {
    window.location.href = 'edit.html?id=' + id;
});
