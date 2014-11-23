var torrentStream = require('torrent-stream');
//var magnet = 'magnet:?xt=urn:btih:bd5b262062bdb9d5d2bcdc318e0c67f05ae9b1dd&dn=Predestination.2014.DVDRip.XviD-EVO&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337';
var magnet = 'magnet:?xt=urn:btih:eeb0d1e32b75b5c3b7b0056de3374c80b57c477e&dn=South.Park.S18E08.HDTV.x264-KILLERS.%5BVTV%5D.mp4&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337';
var engine = torrentStream(magnet, { path: __dirname + '/public'});
var minDownloadSize = 1024 * 1024 * 50;

console.log('running');
engine.on('ready', function() {
    console.log('ready');
    engine.files.forEach(function(file) {
        console.log('filename:', file.name);
        // stream is readable stream to containing the file content
        if (file.name.match(/.*\.(mkv|mp4)/) && file.length > minDownloadSize) {
            console.log('downloading...');
            console.log(file.path);
            var stream = file.createReadStream();
        }
    });
});

