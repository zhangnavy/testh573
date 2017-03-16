var express = require('express');
var router = express.Router();

var articleModel = require('../mongodb/db').articleModel;

/* GET home page. */
router.get('/', function (req, res, next) {
    //读取数据库中所有文章列表的信息

    articleModel.find({})
        .populate('user')
        .exec(function (err, doc) {
            if (!err) {
                req.flash('success', '获取文章列表信息成功');
                res.render('index', {title: '首页标题', articles: doc});
            } else {
                req.flash('error', '获取文章列表信息失败');
                res.redirect('back');
            }
        });
});

module.exports = router;
