/**
 * 数据库操作的工具类
 * 连接数据库
 * 断开数据库连接
 */
var mongoose = require('mongoose');
exports.mongoose = mongoose;
//console.log(mongoose);

/*
连接数据库
 */
function connect() {
    //连接
    mongoose.connect('mongodb://127.0.0.1/atguigu_o2o2');
    //获取连接
    var connection = mongoose.connection;
    //绑定连接错误监听
    connection.on('error', console.error.bind(console, 'connection error:'));
    //绑定连接成功监听
    connection.once('open', function (callback) {
        console.log('WE ARE CONNECTED!');
    });
}
exports.connect = connect;
//connect();

/*
断开连接
 */
var disconnect = function () {
    mongoose.disconnect();
}
exports.disconnect = disconnect;
//disconnect();
