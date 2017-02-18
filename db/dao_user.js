/**
 * 操作users集合的dao模块
 */
var connection = require('./connection');

var mongoose = connection.mongoose;

//test #start
/*connection.connect();
 function callback(error, user) {
 console.log(error, user);
 }*/
//test #end

//schema
/*
    //构造函数
var Schema = mongoose.Schema;
    //实例对象
var userSchema = new Schema({
    phone : String
})
*/
var userSchema = new mongoose.Schema({
    phone : String
});

//model
var UserModel = mongoose.model('user', userSchema); //find/update/delete

//CRUD函数
function getUser(phone, callback) {
    UserModel.findOne({phone:phone}, callback);
}
exports.getUser = getUser;
//getUser('13100000000', callback);


function addUser(phone, callback) {
    var userModel = new UserModel({phone:phone});
    userModel.save(callback)
}
exports.addUser = addUser;
//addUser('12312332112', callback)