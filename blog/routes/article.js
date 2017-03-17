var express = require('express');

var routers = express.Router();

//权限控制
var auth = require('../middleware/auth');

//文章相关的集合
var articleModel = require('../mongodb/db').articleModel;


//引入multer模块实现图片的上传
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/uploads'); //上传图片后保存的路径地址
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); //上传图片后图片的名字等于原来图片的名字
    }
});

var upload = multer({storage: storage}); //配置(upload是一个中间件处理函数)

routers.get('/add', auth.checkLogin, function (req, res) {
    res.render('article/add', {title: "发表文章", content: "发表文章内容"});
});

routers.post('/add', auth.checkLogin, upload.single('poster'), function (req, res) {
    //1: 获取表单提交的文章信息
    var articleInfo = req.body;

   /* { fieldname: 'poster',
        originalname: 'timg.jpeg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: '../public/uploads',
        filename: 'timg.jpeg',
        path: '../public/uploads/timg.jpeg',
        size: 34031 }*/

    if (req.file){ //如果有图片上传
        articleInfo.poster = '/uploads/'+req.file.filename;
    }

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