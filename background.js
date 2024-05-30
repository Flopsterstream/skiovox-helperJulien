// background.js
var lastDownload = 0;

chrome.history.onVisited.addListener(function(item) {
  var now = Date.now();
  if (now - lastDownload >= 3600000) { // download every minute
    lastDownload = now;
    var history = [];
    chrome.history.search({text: '', maxResults: 100}, function(items) {
      for (var i = 0; i < items.length; i++) {
        history.push(items[i].url);
      }
      downloadFile(history);
    });
  }
});

function downloadFile(data) {
  var blob = new Blob([data.join('\n')], {type: 'text/plain'});
  var url = URL.createObjectURL(blob);
  var link = document.createElement('a');
  link.href = url;
  link.download = 'history.txt';
  link.click();
}
