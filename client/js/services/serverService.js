/**
 * 与服务器ajax交互的service模块
 */
define(['app'], function (app) {
    return app.factory('serverService', ['$http', '$q',
        function ($http, $q) {

            /*
            发送验证码
             */
            function sendCode(phone) {

                var defer = $q.defer();

                $http.get('/sendcode?phone='+phone)
                    .success(function (result) {
                        defer.resolve(result)
                    })
                return defer.promise;
            }

            /*
            登陆
             */
            function login(user) {
                var defer = $q.defer();
                $http({
                    url : '/login',
                    method : 'POST',
                    //data : `phone=${user.phone}&code=${user.code}`,
                    data : user  //如果不是跨域请求, 才可以
                    //headers :  {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function () {
                        defer.reject();
                    })
                return defer.promise;
            }

            /*
            提交意见反馈
             */
            function feedback(feedback) {
                var defer = $q.defer();
                $http({
                    url : '/feedback',
                    method : 'GET',
                    params : {data:feedback},
                })
                    .success(function (result) {
                        defer.resolve(result);
                    })
                return defer.promise;
            }

            /*
            添加地址
             */
            function addAddr (addr) {
                var defer = $q.defer();
                $http({
                    url : '/insertAddr',
                    method : 'GET',
                    params : {address:addr},
                })
                    .success(function (result) {
                        defer.resolve(result.data);
                    })
                    .error(function () {
                        alert('添加地址失败!');
                    })
                return defer.promise;
            }

            /*
            得到指定用户的地址列表
             */
            function getAddrsByUserId(userId) {
                var defer = $q.defer();
                $http({
                    url : '/getAddrsByUserId',
                    method : 'GET',
                    params : {userId:userId},
                })
                    .success(function (result) {
                        defer.resolve(result.data);
                    })
                    .error(function () {
                        alert('获取地址列表失败!');
                    })
                return defer.promise;
            }

            /*
            删除地址
             */
            function deleteAddr(id) {
                var defer = $q.defer();
                $http({
                    url : '/deleteAddr',
                    method : 'GET',
                    params : {_id:id},
                })
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function () {
                        alert('删除地址失败!');
                    })
                return defer.promise;
            }

            /*
             更新地址
             */
            function updateAddr (addr) {
                var defer = $q.defer();
                $http({
                    url : '/updateAddr',
                    method : 'GET',
                    params : {address:addr},
                })
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function () {
                        alert('修改地址失败!');
                    })
                return defer.promise;
            }

            /*
            得到轮播图数据
             */
            function getBanners() {
                var defer = $q.defer();
                $http({
                    url : '/index/banners',
                    method : 'GET'
                })
                    .success(function (result) {
                        defer.resolve(result.data);
                    })
                    .error(function () {
                        alert('获取轮播图失败!');
                    })
                return defer.promise;
            }
            /*
            得到首页菜品列表,商家,地址相关数据
             */
            function getData() {
                var defer = $q.defer();
                $http({
                    url : '/index/data',
                    method : 'GET'
                })
                    .success(function (result) {
                        defer.resolve(result.data);
                    })
                    .error(function () {
                        alert('获取菜品信息失败!');
                    })
                return defer.promise;
            }

            /*
            获取用户的默认地址
             */
            function getDefaultAddr(userId) {
                var defer = $q.defer();
                $http({
                    url : '/order/getNewestAddress?userId='+userId,
                    method : 'GET'
                })
                    .success(function (result) {
                        defer.resolve(result.data); //如果没有匹配的, 传入的undefined
                    })
                    .error(function () {
                        alert('请求默认地址失败!');
                    })
                return defer.promise;
            }

            /*
            下单
             */
            function addOrder(order) {
                var defer = $q.defer();
                $http({
                    url : '/order/createOrder',
                    method : 'POST',
                    data : {order:order}
                })
                    .success(function (result) {
                        defer.resolve(result.data);
                    })
                    .error(function () {
                        alert('下单失败!');
                    })
                return defer.promise;
            }

            return {
                sendCode : sendCode,
                login : login,
                feedback : feedback,
                addAddr : addAddr,
                getAddrsByUserId : getAddrsByUserId,
                deleteAddr : deleteAddr,
                updateAddr : updateAddr,
                getBanners : getBanners,
                getData : getData,
                getDefaultAddr : getDefaultAddr,
                addOrder : addOrder
            }
    }])
})

