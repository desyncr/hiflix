var express = require('express'),
    app = express(),
    path = require('path');

app.configure(function() {
    app.use(express.static(path.join(__dirname, 'public')))
});

var server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
