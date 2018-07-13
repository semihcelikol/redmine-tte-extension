// Güven Þahin - guvensahin.com

var redmineHelper = {

    refreshTimeEntriesForBadge(url, apiKey, userId)
    {
        var date = this.getFormattedDate(new Date());

        $.ajax({
            url: url + '/time_entries.json?key=' + apiKey + '&user_id=' + userId + '&spent_on=' + date,
            type: 'get',
            dataType: 'json',
            success: function (data) {

                var total = 0.0;

                $.each(data.time_entries, function (index, item) {
                    total += parseFloat(item.hours);
                });

                chrome.browserAction.setBadgeText({ text: total.toString() });
            }
        });
    },

    getTimeEntriesForPopup(url, apiKey, userId)
    {
        var date = this.getFormattedDate(new Date());

        $.ajax({
            url: url + '/time_entries.json?key=' + apiKey + '&user_id=' + userId + '&spent_on=' + date,
            type: 'get',
            dataType: 'json',
            success: function (data) {

                var total = 0.0;

                $.each(data.time_entries, function (index, item) {
                    var editUrl = url + "/time_entries/" + item.id + "/edit";
                    var projectUrl = url + "/projects/" + item.project.id;

                    var trText = "<tr>";
                    trText += "<td><a target='blank' href='" + projectUrl + "'>" + item.project.name + "</td>";
                    trText += "<td>" + item.comments + "</td>";
                    trText += "<td>";
                    trText += "<strong>" + item.hours + "</strong><br>";
                    trText += "<small><a class='editUrl' target='blank' href='" + editUrl + "'>Edit</a></small>"
                    trText += "</td>";
                    trText += "</tr>";

                    $('table').find('tbody').append(trText);

                    total += item.hours;
                });

                // add total hour
                document.getElementById('sumHour').textContent = total.toString();

                // create time entry url
                $('#createTimeEntry a').attr('href', url + '/time_entries/new');
            }
        });
    },

    getFormattedDate(_date) {
        var ret;

        var dd = _date.getDate();
        var mm = _date.getMonth() + 1; //January is 0!
        var yyyy = _date.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var ret = yyyy + '-' + mm + '-' + dd;

        return ret;
    }
}