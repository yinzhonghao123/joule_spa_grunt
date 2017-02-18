
define(['app', 'storageUtil'], function (app, storageUtil) {
    return app.controller('OrderConfirmCtrl', ['$scope', '$rootScope', 'serverService', '$filter',
        function ($scope, $rootScope, serverService, $filter) {
            $rootScope.appTitle = '下 单'

            //初始化order
            $scope.order = {};

            //检查用户是否登陆,如果没有提示登陆
            var user = storageUtil.local.getItem(storageUtil.KEYS.USER);
            if(user==null) {
                alert('请先登陆!')
                window.location = '#/login'
                return;
            }

            //从session取出保存的用户地址, 如果有, 显示
            var orderAddress = storageUtil.session.getItem(storageUtil.KEYS.ORDER_ADDR);
            //如果没有发送获取当前用户的默认地址的ajax, 如果有, 显示
            if(orderAddress==null) {
                serverService.getDefaultAddr(user._id)
                    .then(function (address) {
                       if(!!address) {
                           $scope.orderAddress = address;
                       } else {
                           //没有
                           alert('没有一个地址,先添加!');
                           window.location = '#/add_new_addr';
                       }
                    })
            } else {
                $scope.orderAddress = orderAddress;
            }

            //送餐时间列表
            initTimes();

            //读取购物车数据, 并显示
            var cart = storageUtil.session.getItem(storageUtil.KEYS.CART);
            $scope.cart = cart;


            /*
            使用$filter的date过滤器来格式化日期时间
             */
            function initTimes() {
                var times = [];   //{value:'2016-11-9 12:10', text:'11:10'}
                var startTime = new Date().getTime();
                times.push({
                    value : $filter('date')(startTime+60*60*1000, 'yyyy-MM-dd HH:mm'),
                    text : '立即配送'
                })
                var endTime = new Date($filter('date')(startTime, 'yyyy-MM-dd')+' 20:00').getTime();
                var intervalTime = 15;//单位是min
                while(startTime<=endTime) {
                    //更新startTime
                    startTime += intervalTime*60*1000;
                    //如果超过了结束循环
                    if(startTime>endTime) {
                        break;
                    }
                    times.push({
                        value : $filter('date')(startTime+60*60*1000, 'yyyy-MM-dd HH:mm'),
                        text : $filter('date')(startTime, 'HH:mm')
                    })
                }
                $scope.times = times;
            }


            /*
            手动拼日期时间
             */
            function initTimes2() {
                var times = [];   //{value:'2016-11-9 12:10', text:'11:10'}

                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth()+1;
                var day = date.getDate();
                var hour = date.getHours();
                var minite = date.getMinutes();
                //添加第一个
                times.push({
                    value : year+'-'+month+'-'+day+' '+(hour+1)+':'+minite,
                    text : '立即配送'
                })

                //添加后面的多个
                var startTime = date.getTime();
                var endTime = new Date(year+'-'+month+'-'+day+' 20:00').getTime();
                var intervalTime = 15;//单位是min
                while(startTime<=endTime) {
                    //更新startTime
                    startTime += intervalTime*60*1000;
                    //如果超过了结束循环
                    if(startTime>endTime) {
                        break;
                    }

                    minite += intervalTime;
                    if(minite>=60) {
                        hour++;
                        minite -= 60;
                    }
                    times.push({
                        value : year+'-'+month+'-'+day+' '+(hour+1)+':'+minite,
                        text : hour+':'+minite
                    })
                }

                $scope.times = times;

            }

            $scope.submit = function () {

                /*
                 {
                 "user_id": "576bbe0aa1d183c42c06c08e",

                 "contactor": "张晓飞",
                 "address": "龙隆昌科技楼",
                 "phone": "13716962779",
                 "doorplate": "3层301",

                 "total_money": 56,
                 "peisongfei": 0,

                 "remark": "加一份米饭",
                 "arrive_time": "2016-6-23 20:14",

                 "detail": "{\"data\":{\"rstId\":1772,\"money\":56,\"meals\":[{\"mealName\":\"藜麦牛油果沙拉\",\"pictures\":\"%2Fsource%2Fassets%2Fimages%2Fimg%2F3.png\",\"num\":1,\"price\":\"23\"},{\"mealName\":\"牛油果三文鱼沙拉\",\"pictures\":\"%2Fsource%2Fassets%2Fimages%2Fimg%2F5.png\",\"num\":1,\"price\":\"33\"}]}}"
                 }
                 */

                $scope.order.user_id = user._id;

                $scope.order.contactor = $scope.orderAddress.contactor;
                $scope.order.address = $scope.orderAddress.address;
                $scope.order.phone = $scope.orderAddress.phone;
                $scope.order.doorplate = $scope.orderAddress.doorplate;

                $scope.order.total_money = $scope.cart.totalPrice;
                $scope.order.peisongfei = $scope.cart.songcanfei;
                var dataObj = {
                    rstId : $scope.cart.rstId,
                    money : $scope.order.total_money + $scope.order.peisongfei,
                    meals : $scope.cart.meals
                }
                $scope.order.detail = JSON.stringify({data:dataObj}); //detail是个字符串

                serverService.addOrder($scope.order)
                    .then(function (order) {
                        console.log(order);
                        alert('下单成功');

                        storageUtil.session.removeItem(storageUtil.KEYS.CART);
                        storageUtil.session.removeItem(storageUtil.KEYS.ORDER_ADDR);

                        window.location = '/order/detail?id='+order._id;
                    })
            }


    }])
})
