document.addEventListener('DOMContentLoaded', function () {
    elem = document.getElementById("cpu");

    var getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    var changeCPUValue = () => {
        elem.innerHTML = getRandomInt(15)
    }

    setInterval(changeCPUValue, 2000)

})