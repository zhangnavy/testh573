var express = require('express');
var router = express.Router();


//引入数据库中的用户集合
var userModel = require('../mongodb/db').userModel;

//引入md5加密模块
var md5 = require('../md5/md5');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//注册
router.get('/reg', function (req, res) {
    res.render('user/reg', {title: "用户注册", content: '注册页内容'});
});

// 4 周
// 20  2(ajax, jsonp)  18   6  12  node + angular
// for 2~3
// 移动端
// 前~后(69)

//用户注册表单提交
router.post('/reg', function (req, res) {
    //1: 获取表单提交的内容
    var userInfo = req.body;
    //2: 保存到数据库中

    userInfo.password = md5(userInfo.password);//密码加密

    //需求：用户名和密码不能和数据库中的数据完全一样
    var query = {username: userInfo.username, password: userInfo.password};
    userModel.findOne(query, function (err, doc) {
        if (!err){
            if (doc){ //数据库中已经有该用户
                console.log('当前用户已注册，请更换用户名和密码');
                res.redirect('back');
            } else { //没有该用户
                userModel.create(userInfo, function (err, doc) {
                    if (!err) {
                        console.log('用户登陆成功');
                        res.redirect('/user/login');
                    } else {
                        console.log('用户登陆失败');
                        res.redirect('back');
                    }
                });
            }
        } else {
            console.log('查询数据库失败');
            res.redirect('back');
        }
    });
});

//登陆
router.get('/login', function (req, res) {
    res.render('user/login', {title: "用户登陆", content: '登陆页内容'})
});

//登陆表单提交请求处理
router.post('/login', function (req, res) {
    //1: 获取登陆信息
    var userInfo = req.body;

    userInfo.password = md5(userInfo.password);

    //2: 数据库中查找该用户的注册信息
    userModel.findOne(userInfo, function (err, doc) {
        if (!err){ //成功
            if (doc){   //doc不为空
                console.log('当前用户登陆成功');
                res.redirect('/');
            } else { //doc 为空
                console.log('当前用户没有注册，请先注册');
                res.redirect('/user/reg');
            }
        } else { //失败
            console.log('数据库中查找用户信息失败');
            res.redirect('back');
        }
    });
});

//退出
router.get('/logout', function (req, res) {
    res.redirect('/');
});


module.exports = router;
