/*
created by Kathrin Hubmann
24.01.2023
*/

// variables
var backBtn = document.getElementById('backBtn');
var list = document.getElementById('beveragesList');

// functions
function init() {
    getSavedBeverages();
}

function getSavedBeverages() {
    // get beverages from database and add them to the list
}

// stuff to happen
//init();

// listeners
backBtn.addEventListener('click', event => {
    window.location.href = 'Watertracking.html';
});