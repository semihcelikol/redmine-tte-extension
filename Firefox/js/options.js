// Güven Şahin - guvensahin.com
// Edit for Firefox Semih Çelikol - semihcelikol.com

function saveOptions() {
    var status = document.getElementById('status');

    var redmineUrl = document.getElementById('redmineUrl').value;
    var redmineApiKey = document.getElementById('redmineApiKey').value;
    var redmineUsername = document.getElementById('redmineUsername').value;

    if (!redmineUrl
        || !redmineApiKey
        || !redmineUsername) {
        status.textContent = 'Please fill all fields.';
        return;
    }

    // connect to redmine, retrive user id.
    $.ajax({
        url: redmineUrl + '/users.json?key=' + redmineApiKey + '&name=' + redmineUsername,
        type: 'get',
        dataType: 'json',
        success: function (data) {
            console.log(data);

            if (!data.users[0]
                || data.users[0].login != redmineUsername)
            {
                status.textContent = 'Username not valid.';
                return;
            };

            var userId = data.users[0].id;

            console.log(userId);

            // chrome'a kaydedilir
            browser.storage.local.set({
                redmineUrl: redmineUrl,
                redmineApiKey: redmineApiKey,
                redmineUsername: redmineUsername,
                redmineUserId: userId
            }, function () {
                // Update status to let user know options were saved.
                status.textContent = 'Options saved.';
                setTimeout(function () {
                    status.textContent = '';
                }, 750);
            });
        },
        error: function (xhr) {
            status.textContent = 'Some fields are not valid.';
            console.log('Redmine Daily Time Entries Error. Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
        }
    });
}

function restoreOptions() {
    // Use default value 
    browser.storage.local.get(null, function (items) {
        document.getElementById('redmineUrl').value = items.redmineUrl;
        document.getElementById('redmineApiKey').value = items.redmineApiKey;
        document.getElementById('redmineUsername').value = items.redmineUsername;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);