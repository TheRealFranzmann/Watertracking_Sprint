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

/**
 * 
 * @param {column: id} id 
 * deletes tuple in database
 * @returns null
 */
async function deleteBeverage(id) {
    if (id == null) return;
    // SQL query: DELETE FROM table_name WHERE id;
};

/**
 * 
 * @param {column: id} id
 * opens popup to confirm (or cancel) deletion
 * @returns null
 */
async function fireDialog(id) {
    
    // line-item in table
    let beverage;
    if (beverage == null) return;

    text = `Do you want to delete this value?` +
        `${beverage}`;

    if (confirm(text) == true) deleteBeverage(id);
}