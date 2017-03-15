//引入mongoose模块
var mongoose = require('mongoose');

//连接数据库
mongoose.connect(require('../dbUrl').dbUrl);

//创建集合中的字段
var userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

//创建集合
var userModel = mongoose.model('user', userSchema);

//用户相关的集合导出
module.exports.userModel = userModel;



