document.getElementById('random-pdp-btn').addEventListener('click', getRandomPDP);

function getRandomPDP() {
    chrome.tabs.create({ url: 'https://www.google.com' });
}

console.log(products[0])
