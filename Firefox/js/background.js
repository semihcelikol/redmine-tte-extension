// Güven Şahin - guvensahin.com
// Edit for Firefox Semih Çelikol - semihcelikol.com

document.addEventListener('DOMContentLoaded', function () {
    browser.storage.local.get(null, function (items) {
        redmineHelper.refreshTimeEntriesForBadge(items.redmineUrl, items.redmineApiKey, items.redmineUserId);
    });
});

// Check every 2 minutes
setInterval(function () {
    browser.storage.local.get(null, function (items) {
        redmineHelper.refreshTimeEntriesForBadge(items.redmineUrl, items.redmineApiKey, items.redmineUserId);
    });
}, 2 * 60 * 1000);


browser.contextMenus.create({
    id: "bgCreate",
    title: "Create time entry",
    contexts: ["browser_action"],
    onclick: function () {
        browser.storage.local.get(null, function (items) {
            var url = items.redmineUrl + '/time_entries/new';

            browser.tabs.create({ url: url });
        });
    }
});