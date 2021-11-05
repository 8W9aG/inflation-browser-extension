console.log("INVOKED BACKGROUND JS")

chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
      if (details.type != "main_frame" || details.method != "GET") {
        return;
      }
      fetch("http://localhost:61563/", {
        method: 'POST',
        body: JSON.stringify({
          url: details.url,
          headers: details.requestHeaders
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => console.log(res)).catch((error) => {
        console.error('Error:', error);
      });
    },
    {urls: ["*://*.amazon.com/*"]},
    ['requestHeaders']
)
