/*
created Bence Gacs
24.01.2023
*/
import { getContainerById } from "./database.js";


var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get("id");
const container = getContainerById(id);

document.getElementById("containerName").innerHTML = container.name;
document.getElementById("creationDate").innerHTML = container.creationDate;
document.getElementById("editDate").innerHTML = container.editDate;
document.getElementById("containerCapacity").innerHTML = container.amount;
document.getElementById("unit").innerHTML = container.unit;

// listeners
backBtn.addEventListener('click', event => {
    window.location.href = 'overview.html';
});

editBtn.addEventListener('click', event => {
    window.location.href = 'edit.html?id=' + id;
});
