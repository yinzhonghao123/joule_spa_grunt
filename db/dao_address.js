/**
 * 操作addresses集合的dao模块
 */
var connection = require('./connection');

//mongoose
var mongoose = connection.mongoose;

//test #start
/*connection.connect();
 function callback(error, result) {
 console.log(error, result);
}*/
//test #end

//schema
var addressSchema = new mongoose.Schema({
    "address": String,
    "contactor": String,
    "lat": String,
    "lng": String,
    "phone": String,
    "sex": Number,
    "state": Number,
    "userId": String,
    "cityId": String,
    "doorplate": String
});

//model
var AddressModel = mongoose.model('address', addressSchema);

//CRUD函数
/*
查询指定用户的地址列表
 */
function getAddrsByUserId(userid, callback) {
    AddressModel.find({userId:userid}, callback);
}
exports.getAddrsByUserId = getAddrsByUserId;
//getAddrsByUserId('575f7085f8a14116283dabc4', callback);

/*
添加地址
 */
function addAddr(addr, callback) {
    new AddressModel(addr).save(callback);
}
exports.addAddr = addAddr;
/*addAddr({
    "address": "尚硅谷大学",
    "contactor": "张三",
    "lat": "39.993851111808",
    "lng": "116.31838249961 ",
    "phone": "17711111111",
    "sex": 1,
    "state": 1,
    "userId": "575f7085f8a14116283dabc4",
    "cityId": "113",
    "doorplate": "212"
}, callback);*/

/*
删除
 */
function deleteAddrById(id, callback) {
    AddressModel.remove({_id:id}, callback);
}
exports.deleteAddrById = deleteAddrById;
//deleteAddrById('581d3bdb2e4c8d2c9cf6385c', callback)

/*
修改
 */
function updateAddr(addr, callback) {
    AddressModel.update({_id:addr._id}, addr, callback)
}
exports.updateAddr = updateAddr;
/*
updateAddr({ _id: '575f7085f8a14116283dab99',
    address: '北京资源宾馆2楼',
    contactor: 'we',
    lat: '39.992876856027',
    lng: '116.31230097131 ',
    phone: '13121121212',
    sex: 1,
    state: 1,
    userId: '575f7085f8a14116283dabc4',
    cityId: null,
    doorplate: 'sdfsfs' }, callback)*/

function getDefaultAddrByUserId (userId, callback) {
    AddressModel.findOne({userId : userId}, callback);
}
exports.getDefaultAddrByUserId = getDefaultAddrByUserId;