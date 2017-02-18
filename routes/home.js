/**
 * 首页路由注册模块
 */
var db = require('../db/db');


module.exports = function (router) {
    /*
    得到轮播图数据
     */
    router.get('/index/banners', function (req, res, next) {
        db.getBanners(function (banners) {
            res.send({
                "code": 0,
                "data": banners
            })
        })
    })

    /*
    得到菜品列表数据
     */
    router.get('/index/data', function (req, res, next) {
        db.getMeals(function (meals) {
            res.send({
                "code": 0,
                "data": {
                    "meals": meals,
                    "isMatched": "yes",
                    "restaurant": { //商家信息对象
                        "_id" : 'xxxx',
                        "address": "北京市海淀区颐和园路2号硅谷电脑城地下二层美食城",
                        "cityId": 0,
                        "coverArea": "[{\"x\":116.306893,\"y\":40.002966},{\"x\":116.312642,\"y\":40.003519},{\"x\":116.314618,\"y\":40.004127},{\"x\":116.315696,\"y\":40.005108},{\"x\":116.319397,\"y\":40.005398},{\"x\":116.321409,\"y\":40.005509},{\"x\":116.324428,\"y\":39.981892},{\"x\":116.310468,\"y\":39.981574},{\"x\":116.307899,\"y\":39.980814},{\"x\":116.307108,\"y\":39.991939},{\"x\":116.306569,\"y\":39.994703},{\"x\":116.30603,\"y\":39.997495},{\"x\":116.305995,\"y\":39.998821}]",
                        "distance": 0.5079205021418997,
                        "id": 1772,
                        "lat": 39.993403,
                        "lng": 116.311644,
                        "minMoney": 0,
                        "phone": "13718213944",
                        "pinpaiId": 0,
                        "rstName": "硅谷店",
                        "songcanfei": 5,
                        "state": 1,
                        "workTime": "08:00-19:00"
                    },
                    "address": {
                        "name": "温都水城",
                        "lat": 39.993403,
                        "lng": 116.311644,
                        "cityId": 113
                    }
                }});
        })
    })
}
