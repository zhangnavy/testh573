var express = require('express');
var router = express.Router();

var articleModel = require('../mongodb/db').articleModel;

//引入markdown模块
var markdown = require('markdown').markdown;

/* GET home page. */
router.get('/', function (req, res, next) {
    //读取数据库中所有文章列表的信息

    articleModel.find({})
        .populate('user')
        .exec(function (err, articles) {
            if (!err) {
                req.flash('success', '获取文章列表信息成功');

                articles.forEach(function (article, index) {
                    article.content = markdown.toHTML(article.content);//让所有文章的内容支持markdown
                });

                res.render('index', {title: '首页标题', articles: articles});
            } else {
                req.flash('error', '获取文章列表信息失败');
                res.redirect('back');
            }
        });
});

module.exports = router;
