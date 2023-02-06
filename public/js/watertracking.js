/*
created by Benjamin Lamprecht
22.10.2022
*/

// variables
var days = [];
var glasJson = 0;
var krugJson = 0;
var x = 0;

var submitBtn = document.getElementById('submit');
var resetBtn = document.getElementById('reset');
var canvas = document.getElementById("myCanvas");
var weight = localStorage.getItem("weight");
var waterMeter = document.getElementById('waterMeter');
var overviewBtn = document.getElementById('overview');

var context = canvas.getContext("2d");
var totalGlas = 0;
var totalKrug = 0;

var dialog = document.getElementById("dialogDelete");
var dayToDelete;


// functions
function init() {
    totalGlas = 0;
    totalKrug = 0;
    if (localStorage.getItem("drinks") != null) days = JSON.parse(localStorage.getItem("drinks"));
    for (let i = 0; i < days.length; i++) {
        let day = JSON.parse(days[i]);
        if (day != null) {
            document.getElementById("#" + i + "Glas").innerHTML = day.glas;
            document.getElementById("#" + i + "Krug").innerHTML = day.krug;
            totalGlas += parseInt(day.glas);
            totalKrug += parseInt(day.krug);
        }
    }
    document.getElementById("sumOfGlas").innerHTML = totalGlas;
    document.getElementById("sumOfKrug").innerHTML = totalKrug;
}

function fetchValues() {
    var num = document.getElementById('quantity').value;
    var glas = document.querySelector('input[name="amount"]:checked').value;

    if (glas == 300) glasJson = num;
    else krugJson = num;

    waterMeter.value = waterMeter.value + (num * glas);
    waterMeter.value = waterMeter.value > waterMeter.max ? waterMeter.max : waterMeter.value;
    document.getElementById('waterMeter').value = waterMeter.value;

}

function drawWater() {
    x = x > 24 ? x = 0 : x++;
    x++;
    let height = waterMeter.value / (waterMeter.max / 100);
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    context.beginPath();
    context.fillStyle = "lightblue";
    context.rect(0, (canvas.clientHeight - (height)), canvas.clientWidth, canvas.clientHeight);
    for (var i = 0; i < 10; i++) {
        context.arc(((i * 25) + x - 25), ((canvas.clientHeight - (height - 15))), 25, 0, Math.PI * 2);
    }
    context.fill();
}

function flush() {
    glasJson = 0;
    krugJson = 0;
}

async function updateDay() {

    //if days are full
    if (days.length >= 7) days.pop();
    //if first execution
    if (days.length > 0) {
        var tempDay = await JSON.parse(days[0]);
        if (tempDay != null && tempDay.date == new Date().toISOString().split('T')[0]) {
            days[0] = await createDay(parseInt(tempDay.glas) + parseInt(glasJson), parseInt(tempDay.krug) + parseInt(krugJson));
            //days[0] = await createDay(8, 8);
            await flush();
            return;
        }
    }
    let temp = await createDay(glasJson, krugJson);
    days.unshift(temp);
    await flush();
}

function saveToJson() {
    localStorage.setItem("weight", weight);
    localStorage.setItem("drinks", JSON.stringify(days));
}

function createDay(glas, krug) {
    let day = {};
    day.glas = glas;
    day.krug = krug;
    day.date = new Date().toISOString().split('T')[0];
    return JSON.stringify(day);
}


// stuff to happen
if (weight == null) weight = 0;

init();

if (weight == 0) {
    weight = prompt("Bitte Gewicht angeben (in kg): ");
    document.getElementById('weight').value = weight;
    if (weight > 75) {
        waterMeter.optimum = 4000;
        waterMeter.max = 4000;
    }
}

setInterval(drawWater, 15);


// listeners
submitBtn.addEventListener('click', async event => {
    event.preventDefault();
    fetchValues();
    document.getElementById('waterMeter').value = waterMeter.value;
    drawWater();
    await updateDay();

    await saveToJson();
    await init();
});

resetBtn.addEventListener('click', async event => {
    event.preventDefault();
    document.getElementById('waterMeter').value = 0;

    let tempDay = JSON.parse(days[0]);
    if (tempDay.date == new Date().toISOString().split('T')[0]) {
        days.pop();
    }
    document.getElementById("#0Glas").innerHTML = '-';
    document.getElementById("#0Krug").innerHTML = '-';
    saveToJson();
    init();
});

async function deleteDay(i, thisDay) {
    document.getElementById("#" + i + "Glas").innerHTML = '-';
    document.getElementById("#" + i + "Krug").innerHTML = '-';

    totalGlas -= parseInt(thisDay.glas);
    totalKrug -= parseInt(thisDay.krug);

    document.getElementById("sumOfGlas").innerHTML = totalGlas;
    document.getElementById("sumOfKrug").innerHTML = totalKrug;

    days[i] = null;

    // SQL query: DELETE FROM table_name WHERE thisDay.date;

    saveToJson();
};

async function fireDialog(i) {
    let thisDay = await JSON.parse(days[i]);
    if (thisDay == null) return;

    text = `Do you want to delete this value? \n` +
        `Day: ${thisDay.date} \t Glas: ${thisDay.glas} \t Krugs: ${thisDay.krug}`;

    if (confirm(text) == true) deleteDay(i, thisDay);
}

overviewBtn.addEventListener('click', event => {
    window.location.href = '/overview';
});