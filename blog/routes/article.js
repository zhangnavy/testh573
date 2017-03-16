var express = require('express');

var routers = express.Router();

//权限控制
var auth = require('../middleware/auth');

//文章相关的集合
var articleModel = require('../mongodb/db').articleModel;

routers.get('/add', auth.checkLogin, function (req, res) {
    res.render('article/add', {title: "发表文章", content: "发表文章内容"});
});

routers.post('/add', auth.checkLogin, function (req, res) {
    //1: 获取表单提交的文章信息
    var articleInfo = req.body;

    //设置发表文章时间
    articleInfo.createAt = Date.now();

    //文章的作者
    articleInfo.user = req.session.user._id;

    //2: 将文章信息保存到数据库中
    articleModel.create(articleInfo, function (err, doc) {
        if (!err){
            req.flash('success', '用户发表文章成功');
            res.redirect('/');
        } else {
            req.flash('error', '用户发表文章失败');
            res.redirect('back');
        }
    });
});

module.exports = routers;