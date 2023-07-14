let badData = [];
let urlHttps = document.getElementById("urlHttps")
let urlBase = document.getElementById("urlBase")
let urlDisplay = document.getElementById('urlDisplay')
let numberOf404Checks = 0;
let pageLoadTime = document.getElementById("page-load-time");

updateCurrentUrl();

urlHttps.addEventListener('input', updateCurrentUrl);
urlBase.addEventListener('input', updateCurrentUrl);

document.getElementById('random-pdp-btn').addEventListener('click', getRandomPDP);

function getRandomPDP() {
    let randomProductIndex = getRandomInt(0, products.length - 1);
    let randomUrl = products[randomProductIndex].__5;
    chrome.tabs.update({ url: `${urlDisplay.innerHTML}${randomUrl}` });
    check404();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateCurrentUrl() {
    urlDisplay.innerHTML = `${urlHttps.value}${urlBase.value}`;
}

function check404() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const tab = tabs[0];
      const tabUrl = tab.url;
  
      fetch(tabUrl, { method: 'HEAD' })
        .then(response => {
          const statusCode = response.status;
          if (statusCode === 404) {
            console.log('Current page is a 404');
            badData.push(tabUrl)
            if (numberOf404Checks < 500) {
              numberOf404Checks += 1;
              getRandomPDP();
            }
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
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.loadTime) {
      const loadTime = request.loadTime;
        pageLoadTime.innerHTML = loadTime;
        pageLoadTime.style.color = updateLoadTimeColor(loadTime);
        if(loadTime < 1000) {
            pageLoadTime.innerHTML += '&nbsp; &#x1F525;'
        }else if(loadTime > 7000){
            pageLoadTime.innerHTML += '&nbsp; &#x1F422;'
        }
    }
});

const updateLoadTimeColor = (loadTime) => {
    if(loadTime){
        if(loadTime < 2500){
            return 'green'
        }else if(loadTime > 2500 && loadTime < 6000){
            return 'orange'
        }else if(loadTime > 6000){
            return 'red'
        }else{
            return 'blue'
        }
    }
}


const baseUrl = 'https://superbrightleds.com';
const goodData = [];

function testUrls() {
    const min = 19000;
    const max = 20000;
  for (let i = 0; i < max; i++) {
    const url = baseUrl + products[i].__5;
    if(i > min) {
        fetch(url, { method: 'HEAD' })
          .then(response => {
            const statusCode = response.status;
            if (statusCode === 404) {
              badData.push(products[i]);
            } else {
              goodData.push(products[i]);
            }
          })
          .catch(error => {
            console.error('Failed to fetch the page:', error);
        });
    }
  }
}

// testUrls();








