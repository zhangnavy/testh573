var express = require('express');

var routers = express.Router();

routers.get('/add', function (req, res) {
    res.render('article/add', {title: "发表文章", content: "发表文章内容"});
});

module.exports = routers;