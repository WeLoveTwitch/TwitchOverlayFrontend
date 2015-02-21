TwitchOverlay.service('Emote', [function() {

    var emotes = [];

    return {
        get: function() {
            return emotes;
        },
        set: function(emotesFromServer) {
            emotes.length = 0;

            emotesFromServer = emotesFromServer.sort(function(a, b) {
                if(a.regex.length > b.regex.length) {
                    return -1;
                }
                if(a.regex.length < b.regex.length) {
                    return 1;
                }
                return 0;
            });

            emotesFromServer.forEach(function(emote) {
                emotes.push(emote);
            });
        }
    }
}]);