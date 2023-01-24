var measureWater = document.getElementById('measure-water');
var waterAmount = document.getElementById('water-amount');
var saveButton = document.getElementById('saveWaterAmount');
var water = 0;
var saveCookiesForMin = 10080;
var getItemsForDays = 7;
var tableItems = [];

function setCookie(cname, cvalue, exmin) {
    const d = new Date();
    d.setTime(d.getTime() + (exmin*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    decodedCookie = NaN;
    ca = NaN;
    name = NaN;
    return "";
}

function calculateConsumedWater(waterAmount, times){
    return (waterAmount * times) / 1000;
}

function setCurrentWaterAmount(waterAmountConsumed){
    if(waterAmountConsumed > 0){
        measureWater.value = waterAmountConsumed;
        waterAmount.innerText = waterAmountConsumed;
        var min = 1.5;
        if(waterAmountConsumed < min){
            measureWater.style.background = '#FF0000';
        } else  {
            measureWater.style.background = '#000000';
        }
    }
}

function drawTable(result){
    var table = document.getElementById('lastDaysTable');

    function addCell(tr, text){
        var td = tr.insertCell();
        td.textContent = text;
        return td;
    }

    var th = table.createTHead();
    var headerRow = th.insertRow();
    addCell(headerRow, 'letzten 7 Tage');
    addCell(headerRow, 'getrunken in Liter');
    addCell(headerRow, 'Glas');
    addCell(headerRow, 'Krug');

    result.forEach(function (item) {
        var row = table.insertRow();
        addCell(row, item.date);
        addCell(row, item.amount);
        addCell(row, item.glass);
        addCell(row, item.mug)
    });
}

function updateTableData(){
    var data = [];
    for(var i = 0; i <= getItemsForDays; i++){
        const today = new Date()
        const day = new Date(today)
        day.setDate(day.getDate() - i)
        var dataOfDay = getCookie(new Date(day).toLocaleDateString("de-DE").toString());
        if(dataOfDay){
            var item = JSON.parse(dataOfDay);
            data.push(item);
        }
    }
    return data;
}

var tempData = updateTableData();
var data = tempData[0];
if(data){
    setCurrentWaterAmount(data.amount);
}
drawTable(updateTableData());

saveButton.addEventListener('click', ev => {
    var tempData = updateTableData();
    var data = tempData[0];
    var waterAmountConsumed = 0;
    var mug = 0;
    var glass = 0;
    if(data){
        waterAmountConsumed = parseFloat(data.amount);
        mug = data.mug;
        glass = data.glass; 
    }

    var waterAmountToAdd = document.querySelector('input[name="amount"]:checked').value;
    if(waterAmountToAdd == 300){
        glass++;
    } else if (waterAmountToAdd == 500) {
        mug++;
    }
    var times = document.getElementById('times').value;
    waterAmountConsumed += calculateConsumedWater(waterAmountToAdd, times);
    setCurrentWaterAmount(waterAmountConsumed);

    var day = new Date().setHours(0, 0, 0, 0);
    var item = {
        date: new Date(day).toLocaleDateString("de-DE"),
        amount: waterAmountConsumed.toFixed(3),
        glass: glass,
        mug: mug};
    setCookie(new Date(day).toLocaleDateString("de-DE").toString(), JSON.stringify(item), saveCookiesForMin);
});