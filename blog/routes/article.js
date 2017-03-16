var express = require('express');

var routers = express.Router();

//权限控制
var auth = require('../middleware/auth');

routers.get('/add', auth.checkLogin, function (req, res) {
    res.render('article/add', {title: "发表文章", content: "发表文章内容"});
});

module.exports = routers;