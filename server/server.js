// modules =================================================
var express = require('express');
var app = express();
var path = require('path');

// set our port
var port = process.env.PORT || 3000;

app.use(express.static(path.resolve('./dist')));
app.use('/node_modules', express.static('node_modules'));

app.get('*', function(req, res, next) {
    res.sendFile(path.resolve('./dist/index.html'));
});


// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user                     
console.log('Magic happens on port ' + port);

exports = module.exports = app;