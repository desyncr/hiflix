var ui = {
    documentTitle: '',

    formError: function() {
        $('#info').css({border: '2px solid red'});
    },
    formClear: function() {
        $('#info').css({border: ''});
    },
    checkInput: function(video) {
        if (video.length !== 40) {
            this.formError();
            return false;
        }
        this.formClear();
        return true;
    },
    showPlayer: function(video) {
        $('body').addClass('theater');
        $('#content').hide('slow');
        $('#movie').show('slow');

        documentTitle = document.title;
        document.title = 'Watching ' + video.replace('/stream/', '') + ' - hiFlix';

        var $video = $('#player');
        var $source = $('<source>');
        $source.attr('src', video);
        $source.attr('type', 'video/mp4');
        $video.append($source);
        videojs("#player");
    },
    hidePlayer: function() {
        $('#player source').remove();
        document.title = documentTitle;
        $('#movie').hide();
        $('#content').show();
        $('body').removeClass('theater');
    },
    loading: function() {
        $('#content img').css({display: 'block'});
    },
    loaded: function() {
        $('#content img').css({display: 'none'});
    }
}
