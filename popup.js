
let urlHttps = document.getElementById("urlHttps")
let urlBase = document.getElementById("urlBase")
let urlDisplay = document.getElementById('urlDisplay')

updateCurrentUrl();

urlHttps.addEventListener('input', updateCurrentUrl);
urlBase.addEventListener('input', updateCurrentUrl);

document.getElementById('random-pdp-btn').addEventListener('click', getRandomPDP);

function getRandomPDP() {
    let randomProductIndex = getRandomInt(0, products.length - 1);
    let randomUrl = products[randomProductIndex].__5;
  chrome.tabs.create({ url: `${urlDisplay.innerHTML}${randomUrl}` });
  
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateCurrentUrl() {
    urlDisplay.innerHTML = `${urlHttps.value}${urlBase.value}`;
}

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const tab = tabs[0];
    const tabUrl = tab.url;
  
    // Send a HEAD request to the URL to get the HTTP status code
    fetch(tabUrl, { method: 'HEAD' })
      .then(response => {
        const statusCode = response.status;
        if (statusCode === 404) {
          console.log('Current page is a 404');
        } else {
          // Handle other cases
          console.log('Current page is not a 404');
        }
      })
      .catch(error => {
        // Handle fetch error
        console.error('Failed to fetch the page:', error);
      });
  });
  

