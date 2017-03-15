var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//注册
router.get('/reg', function (req, res) {
  res.render('user/reg', {title:"用户注册", content: '注册页内容'});
});

//登陆
router.get('/login', function (req, res) {
  res.render('user/login', {title:"用户登陆", content: '登陆页内容'})
});

//退出
router.get('/logout', function (req, res) {
  res.redirect('/');
});



module.exports = router;
