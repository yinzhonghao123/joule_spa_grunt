/**
 * 主js
 */

//配置require
require.config({
    //基本路径
    //baseUrl : 'js/',   //打包时是在通过main.js来查找的
    //映射模块: name:path
    paths : {
        //lib模块
        'angular' : 'libs/angular',
        'angularMessages' : 'libs/angularMessages',
        'angularRoute' : 'libs/angularRoute',
        'Swiper': 'libs/swiper.min',

        //应用模块
        'app' : 'app/app',

        //controllers
        'HomeCtrl' : 'controllers/HomeCtrl',
        'PersonalCtrl' : 'controllers/PersonalCtrl',
        'AddNewAddrCtrl' : 'controllers/AddNewAddrCtrl',
        'AddrManageCtrl' : 'controllers/AddrManageCtrl',
        'FeedbackCtrl' : 'controllers/FeedbackCtrl',
        'ChooseCoordinateCtrl' : 'controllers/ChooseCoordinateCtrl',
        'LocationAddrCtrl' : 'controllers/LocationAddrCtrl',
        'LoginCtrl' : 'controllers/LoginCtrl',
        'OrderConfirmCtrl' : 'controllers/OrderConfirmCtrl',

        //routes
        'appRoute' : 'routes/appRoute',

        //services
        'serverService' : 'services/serverService',
        'mapService' : 'services/mapService',

        //utils
        'storageUtil' : 'utils/storageUtil'
    },
    //非AMD模块
    shim : {
        'angular' : {
            exports : 'angular'
        },
        'angularMessages' : {
            exports : 'angularMessages',
            deps : ['angular']
        },
        'angularRoute' : {
            exports : 'angularRoute',
            deps : ['angular']
        },
        'Swiper' : {
            exports : 'Swiper'
        }
    }
})

//加载模块, 启动angular
require([
    'angular', 'angularMessages', 'angularRoute', 'app',
    'HomeCtrl', 'PersonalCtrl', 'appRoute','AddNewAddrCtrl',
    'AddrManageCtrl','ChooseCoordinateCtrl', 'FeedbackCtrl',
    'LocationAddrCtrl', 'LoginCtrl', 'OrderConfirmCtrl',
    'serverService', 'storageUtil','mapService','Swiper'
], function (angular) {
    angular.bootstrap(document, ['dcApp'])
})
