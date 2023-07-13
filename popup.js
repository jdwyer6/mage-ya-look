document.getElementById('random-pdp-btn').addEventListener('click', getRandomPDP);

function getRandomPDP() {
    let randomProductIndex = getRandomInt(0, products.length - 1);
    let randomUrl = products[randomProductIndex].__5;
    window.location.href = randomUrl;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(products[getRandomInt(0, products.length - 1)].__5);
