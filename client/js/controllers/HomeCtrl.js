define(['app', 'Swiper', 'storageUtil'], function (app, Swiper, storageUtil) {
    return app.controller('HomeCtrl', ['$scope', '$rootScope', 'mapService', 'serverService', '$timeout',
        function ($scope, $rootScope, mapService, serverService, $timeout) {
            $rootScope.appTitle = '首页'

            //获取首页相关数据, 并显示
            serverService.getBanners()
                .then(function (banners) {
                    $scope.banners = banners;

                    setTimeout(function () {
                        new Swiper('#bannerSwiper', { //配置对象
                            pagination : '.swiper-pagination', //指定提示圆点显示的容器选择器
                            paginationClickable : true,  //提示圆点是否可点击
                            autoplay : 3000, //自动播放的间隔时间
                            autoplayDisableOnInteraction : false, //手动操作后重新自动播放
                            loop : true, //循环翻页
                            effect : 'cube', //翻页效果:立体
                            cube : {
                                shadow : false //下部没有阴影
                            }
                        })
                    }, 100); //必须延迟创建Swiper
                })
            serverService.getData()
                .then(function (data) {
                    $scope.data = data;

                    //在得到data数据之后, 需要比较data中meals与cart中的meals, 并同步
                    updateMeals();

                    //保存送餐费
                    $scope.cart.songcanfei = data.restaurant.songcanfei;
                    //保存送商家id
                    $scope.cart.rstId = data.restaurant._id;

                    //获取保存的定位地址
                    var locAddr = storageUtil.session.getItem(storageUtil.KEYS.LOC_ADDR);
                    if(locAddr!=null) {//直接显示地址
                        $scope.data.address = locAddr;
                    } else {//定位当前地址
                        $scope.data.address.name = '正在定位中...'
                        mapService.loadMapAPI('homeDiv', 'initMap');
                        window.initMap = function () {
                            mapService.getCurrentAddr()
                                .then(function (address) {
                                    console.log(address);
                                    $scope.data.address = address;
                                    storageUtil.session.setItem(storageUtil.KEYS.LOC_ADDR, address);
                                })
                        }
                    }
                })

            /*
            更新meals
             */
            function updateMeals() {
                var dMeals = $scope.data.meals;
                var cMeals = $scope.cart.meals;

                for (var i = 0; i < dMeals.length; i++) {
                    var dMeal = dMeals[i];
                    for (var j = 0; j < cMeals.length; j++) {
                        var cMeal = cMeals[j];
                        if(dMeal._id===cMeal._id) {
                            //将购物车中meal的count给data中的meal
                            dMeal.count = cMeal.count;
                            //用data中的meal替换cart中对应的meal
                            cMeals[j] = dMeal;
                            //cMeal = dMeal;
                        }

                    }
                }
            }

            //初始化购物车
            initCart();

            function initCart() {
                var cart = storageUtil.session.getItem(storageUtil.KEYS.CART);
                if(cart===null) {
                    cart = {
                        meals : [],
                        "songcanfei": 0,
                        "totalPrice": 0,
                        "totalCount": 0,
                        "rstId": null
                    };
                }
                $scope.cart = cart;
            }

            /*
            更新购物车中某个菜品数量
             */
            $scope.updateMealCount = function (isAdd, meal, event) {

                /*
                 * 克隆出一个发生事件的<a>, 指定内容1, 指定样式, 添加到<body>
                 * 计算出当前的起始坐标(根据<a>): startLeft, startTop, 并设置上
                 * 计算目录位置的坐标(id为total_count的div): endLeft, endTop
                 * 移动动画
                 * 持续多长时间: totalTime = 500
                 * 小移动的间隔时间: intervalTime = 20
                 * 计算出移动的次数: moveCount = totalTime/intervalTime
                 * 计算出每小的移动的距离:
                 moveX = (endLeft-startLeft) / moveCount
                 moveY = (endTop-startTop) / moveCount
                 * 启动循环定时器
                 * 更新startLeft/startTop
                 * 设置给<a>
                 * 判断是否已经到达目标处, 如果到达了, 停止定时器
                 */

                //克隆出一个发生事件的<a>, 指定内容1, 指定样式, 添加到<body>
                var $a = angular.element(event.target);
                var $flyA = $a.clone().html('1').addClass('jia-fly');
                var $body = angular.element(document.body);
                $body.append($flyA);

                //计算出当前的起始坐标(根据<a>): startLeft, startTop, 并设置上
                var startLeft = $a[0].getBoundingClientRect().left;
                var startTop = $a[0].getBoundingClientRect().top;
                $flyA.css({
                    left : startLeft+'px',
                    top : startTop+'px'
                })

                //计算目录位置的坐标(id为total_count的div): endLeft, endTop
                var totalCountDiv = document.getElementById('total_count');
                var endLeft = totalCountDiv.getBoundingClientRect().left;
                var endTop = totalCountDiv.getBoundingClientRect().top;

                //移动动画
                    //持续多长时间: totalTime = 500
                var totalTime = 500;
                    //小移动的间隔时间: intervalTime = 20
                var intervalTime = 20;
                    //计算出移动的次数: moveCount = totalTime/intervalTime
                var moveCount = totalTime/intervalTime;
                    //计算出每小的移动的距离:
                var moveX = (endLeft-startLeft)/moveCount;
                var moveY = (endTop-startTop)/moveCount;
                    //启动循环定时器
                var intervalId = setInterval(function () {
                    //更新startLeft/startTop
                    startLeft += moveX;
                    startTop += moveY;
                    //判断是否已经到达目标处, 如果到达了, 停止定时器
                    if(startLeft<=endLeft) {
                        startLeft = endLeft;
                        startTop = endTop;
                        clearInterval(intervalId)
                    }
                    //设置给<a>
                    $flyA.css({
                        left : startLeft+'px',
                        top : startTop+'px'
                    })
                }, intervalTime);

                $timeout(function () {
                    //移除<a>
                    $flyA.remove();
                    if(isAdd) { //增加
                        if(meal.count) { //已经在购物车中了
                            meal.count++;
                        } else {
                            meal.count = 1;
                            //添加到购物车
                            $scope.cart.meals.push(meal);
                        }

                        $scope.cart.totalPrice += meal.price;
                        $scope.cart.totalCount += 1;
                    } else {
                        meal.count--;
                        if(meal.count===0) { //从购物车移除
                            //找到下标
                            var index = $scope.cart.meals.findIndex(function (item, index) {
                                return item.count===0;
                            })
                            //删除
                            $scope.cart.meals.splice(index, 1);
                        }

                        $scope.cart.totalPrice -= meal.price;
                        $scope.cart.totalCount -= 1;
                        if($scope.cart.totalCount===0) {
                            $scope.isOpen = false;
                        }
                    }

                    //保存cart
                    storageUtil.session.setItem(storageUtil.KEYS.CART, $scope.cart);
                }, totalTime+20);

            }

            $scope.isOpen = false;
            $scope.changeState = function () {
                this.isOpen = !this.isOpen;
            }

            $scope.toOrderConfirm = function () {
                if($scope.cart.totalCount>0) {
                    window.location = '#/order_confirm'
                }
            }
    }])
})
