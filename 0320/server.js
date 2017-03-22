var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(__dirname));
app.get('/getUserInfo', function (req, res) {
    res.sendFile(path.join(__dirname, 'data.json'));
});
app.listen(8888);