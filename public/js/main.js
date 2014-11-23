var main = {
    init: function() {
        $('#torrent').on('submit', function(event) {
            event.preventDefault();
            var video = $('#info').val();
            if (!ui.checkInput(video)) {
                return;
            }

            window.location.hash = video;
            ui.loading();
            api.stream(video, function(data) {
                ui.loaded();
                ui.showPlayer(data.src);
            })
        })

        var hash = window.location.hash.replace('#', '');
        if (hash) {
            ui.loading();
            $('#info').val(hash);
            api.stream(hash, function(data) {
                ui.loaded();
                ui.showPlayer(data.src)
            })
        }
    }
}

