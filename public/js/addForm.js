// variables
const backBtn = document.getElementById('backBtn');

// listener

backBtn.addEventListener('click', event => {
    window.location.href = '/overview';
});

document.getElementById("form").addEventListener("submit", function (event) {
    var input = document.getElementById("amount");
    if (input.value < 0) {
      event.preventDefault();
      alert("Only positive numbers are allowed.");
    }
  });