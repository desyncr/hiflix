var api = {
    stream: function(hash, onPlay) {
        io = io.connect()
        io.emit('stream', {hash: hash});
        io.on('play', onPlay);
    }
}

