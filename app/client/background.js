chrome.browserAction.onClicked.addListener(function(activeTab) {
    var newURL = chrome.extension.getURL('public/index.html');
    chrome.tabs.create({url: newURL});
});

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     console.log("Got message");
//     chrome.cookies.get({
//         url: "http://localhost/",
//         name: request.cookieName
//     }, function(cookies) {
//       console.log(cookies);
//         sendResponse(cookies);
//     });
// });
