// Güven Þahin - guvensahin.com

chrome.storage.sync.get(null, function (items) {
    redmineHelper.getTimeEntriesForPopup(items.redmineUrl, items.redmineApiKey, items.redmineUserId);
});

