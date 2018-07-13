// Güven Şahin - guvensahin.com

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(null, function (items) {
        redmineHelper.refreshTimeEntriesForBadge(items.redmineUrl, items.redmineApiKey, items.redmineUserId);
    });
});

// Check every 2 minutes
setInterval(function () {
    chrome.storage.sync.get(null, function (items) {
        redmineHelper.refreshTimeEntriesForBadge(items.redmineUrl, items.redmineApiKey, items.redmineUserId);
    });
}, 2 * 60 * 1000);


chrome.contextMenus.create({
    title: "Create time entry",
    contexts: ["browser_action"],
    onclick: function () {
        chrome.storage.sync.get(null, function (items) {
            var url = items.redmineUrl + '/time_entries/new';

            chrome.tabs.create({ url: url });
        });
    }
});