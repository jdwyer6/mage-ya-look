window.addEventListener('load', function() {
    // Calculate page load speed
    const timing = window.performance.timing;
    const loadTime = timing.domContentLoadedEventEnd - timing.navigationStart;
    chrome.runtime.sendMessage({ loadTime });
  });
  