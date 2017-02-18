/**
 * 配置处理地址相关请求的路由模块
 */
var db = require('../db/db')

module.exports = function (router) {

    /*
    添加地址
     */
    router.get('/insertAddr', function (req, res, next) {
        var address = JSON.parse(req.query.address);
        db.addAddr(address, function (addr) {
            res.send({
                code : 0,
                data : addr
            })
        })
    })

    /*
     查询地址列表
     */
    router.get('/getAddrsByUserId', function (req, res, next) {
        var userId = req.query.userId;
        db.getAddrsByUserId(userId, function (addrs) {
            res.send({
                code : 0,
                data : addrs
            })
        })
    })

    /*
     修改地址
     */
    router.get('/updateAddr', function (req, res, next) {
        var address = JSON.parse(req.query.address);
        db.updateAddr(address, function (result) {
            res.send({
                code : 0,
                data : result
            })
        })
    })

    /*
     删除地址
     */
    router.get('/deleteAddr', function (req, res, next) {
        var id = req.query._id;
        db.deleteAddrById(id, function (result) {
            res.send({
                code : 0,
                data : result
            })
        })
    })
}