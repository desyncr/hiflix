var app = require('express.io')(),
    ts = require('torrent-stream');

var options = {
    path: __dirname + '/stream/',
};
var minDownloadSize = 50 * 1024 * 1024;

app.http().io();

// Setup the ready route, and emit talk event
app.io.route('stream', function(req) {
    console.log('magnet infohash: ' + req.data.hash);
    if (req.data.hash.length !== 40) {
        console.log('bad magnet infohash. ignoring');
        return;
    }

    var engine = ts('magnet:?xt=urn:btih:' + req.data.hash, options);
    engine.on('ready', function() {
        console.log('engine.onReady');
        engine.files.forEach(function(file) {
            if (file.name.match(/.*\.(mkv|mp4)/) && file.length > minDownloadSize) {
                console.log('download: ' + file.path);
                var stream = file.createReadStream();
            } else {
                console.log('ignoring: ' + file.path);
            }
        })
    })

    var req = req,
        signaled = false;

    engine.on('download', function() {
        // Hack due the lack of onFirstPiece (or similar) event
        if (signaled) {
            return;
        }

        console.log('engine.onDownload');
        engine.files.forEach(function(file) {
            if (file.name.match(/.*\.(mkv|mp4)/) && file.length > minDownloadSize) {
                console.log('emit.play: ' + file.path);
                req.io.emit('play', { src: '/stream/' + req.data.hash + '/' + file.path})
                signaled = true;
            }
        })
    })
})

app.get('/stream/:file(*)', function(req, res, next){
  var file = req.params.file
    , path = options.path + '/' + file.replace('..', '');

  res.sendfile(path);
})

app.get('/:file(*)', function(req, res) {
  var file = req.params.file
    , path = __dirname + '/public/' + file.replace('..', '');

  res.sendfile(path);
});

app.listen(process.env.PORT || 3000)
