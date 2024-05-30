chrome.history.onVisited.addListener(function(item) {
  var history = [];
  chrome.history.search({text: '', maxResults: 5}, function(items) {
    for (var i = 0; i < items.length; i++) {
      history.push(items[i].url);
    }
    alert(history);
  });
});
