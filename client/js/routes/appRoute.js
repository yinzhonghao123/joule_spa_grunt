/**
 * 前端路由配置模块
 */
define(['app'], function (app) {
    return app.config(['$routeProvider', function ($routeProvider) {
        //注册路由
        $routeProvider
            .when('/home', {
                templateUrl : 'js/templates/home.html',
                controller : 'HomeCtrl'
            })
            .when('/personal', {
                templateUrl : 'js/templates/personalCenter.html',
                controller : 'PersonalCtrl'
            })
            .when('/add_new_addr', {
                templateUrl : 'js/templates/addNewAddr.html',
                controller : 'AddNewAddrCtrl'
            })
            .when('/addr_manage', {
                templateUrl : 'js/templates/addrManage.html',
                controller : 'AddrManageCtrl'
            })
            .when('/choose_oordinate', {
                templateUrl : 'js/templates/chooseCoordinate.html',
                controller : 'ChooseCoordinateCtrl'
            })
            .when('/feedback', {
                templateUrl : 'js/templates/feedback.html',
                controller : 'FeedbackCtrl'
            })
            .when('/location_addr', {
                templateUrl : 'js/templates/locationAddr.html',
                controller : 'LocationAddrCtrl'
            })
            .when('/login', {
                templateUrl : 'js/templates/login.html',
                controller : 'LoginCtrl'
            })
            .when('/order_confirm', {
                templateUrl : 'js/templates/orderConfirm.html',
                controller : 'OrderConfirmCtrl'
            })
            .otherwise('/home')
    }])
})
