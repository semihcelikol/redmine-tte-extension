// Güven Şahin - guvensahin.com
// Edit for Firefox Semih Çelikol - semihcelikol.com

browser.storage.local.get(null, function (items) {
    redmineHelper.getTimeEntriesForPopup(items.redmineUrl, items.redmineApiKey, items.redmineUserId);
});

