console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({
        url: "popup.html"
    });
});

chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    // read changeInfo data and do something with it
    // like send the new url to contentscripts.js
    if (changeInfo.url) {
      chrome.tabs.sendMessage( tabId, {
        message: 'hello!',
        url: changeInfo.url
      })
    }
  }
);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("Got Message! " + request.contentScriptQuery);
        if (request.contentScriptQuery == "queryAbout") {
            var url = "https://www.reddit.com/user/" + request.user.name + "/about.json";
            fetch(url)
                .then(response => response.json())
                .then(res => sendResponse({
                    'json': res,
                    'user': request.user
                }))
                .catch(error => console.log(error));
            return true; // Will respond asynchronously.
        } else if (request.contentScriptQuery == "queryComment") {
            var url = request.url;
            fetch(url)
                .then(response => response.json())
                .then(res => sendResponse({
                    'json': res,
                    'user': request.user,
                    'type': request.type
                }))
                .catch(error => console.log(error));
            return true;
        }

        if (request.contentScriptQuery == "queryDiscussion") {
            var url = request.url;
            console.log("background_script", url);
            fetch(url)
                .then(response => response.json())
                .then(res => sendResponse({
                    'json': res,
                    'type': 'json'
                }))
                .catch(error => console.log(error));
            return true; // Will respond asynchronously.
        }
});
