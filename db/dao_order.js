/**
 * 操作orders集合的dao模块
 */
var connection = require('./connection')

var mongoose = connection.mongoose;

var orderSchema = new mongoose.Schema({
    "contactor": String,
    "address": String,
    "phone": String,
    "rstName": String,
    "remark": String,
    "doorplate": String,
    "total_money": Number,
    "peisongfei": Number,
    "state": Number,
    "arrive_time": Date,
    "detail": String,
    "user_id": String,
    "coupon_id": String
});

var OrderModel = mongoose.model('order', orderSchema);

function addOrder(order, callback) {
    new OrderModel(order).save(callback);
}
exports.addOrder = addOrder;

function getOrderById(id, callback) {
    OrderModel.findOne({_id:id}, callback);
}
exports.getOrderById = getOrderById;

//根据userId查询对应的订单列表
function getOrdersByUserId(userId, fn) {
    OrderModel.find({user_id : userId}, fn);
}
exports.getOrdersByUserId = getOrdersByUserId;
