define(['app', 'storageUtil'], function (app, storageUtil) {
    return app.controller('LocationAddrCtrl', ['$scope','$rootScope','serverService','mapService',
        function ($scope, $rootScope, serverService, mapService) {

            $rootScope.headTitle = "选择地址";

            //检查用户是否登陆
            var user = storageUtil.local.getItem(storageUtil.KEYS.USER);
            if(user==null) {
                alert('请先登陆!');
                window.location = '#/login';
                return;
            }

            //显示地址列表
            serverService.getAddrsByUserId(user._id)
                .then(function (addressArr) {
                    $scope.addressArr = addressArr;
                });

            //显示当前地址
            var locationAddr = storageUtil.session.getItem(storageUtil.KEYS.LOC_ADDR);
            $scope.locationAddr = locationAddr;
            //请求获取当前地址附近地址列表显示
            mapService.getAroundAddrs(locationAddr)
                .then(function (addrs) {
                    $scope.aroundAddrArr = addrs;
                });

            //根据地址关键字搜索相关的地址列表
            $scope.showSearch = false;
            $scope.search = function () {
                var searchText = $scope.searchText;
                if(searchText.trim()==='') {
                    return;
                }

                $scope.showSearch = true;
                mapService.getPlaceAddrs(searchText)
                    .then(function (addrs) {
                        $scope.searchAddrArr = addrs;
                    })
            }

            //取消搜索
            $scope.cancelSearch = function () {
                $scope.showSearch = false;
                $scope.searchText = '';
                $scope.searchAddrArr = null;
            }


            $scope.locating = false;
            //重新定位
            $scope.relocation = function () {
                $scope.locating = true;

                mapService.loadMapAPI('loc_addr_div', 'initMap');
                window.initMap = function () {
                    mapService.getCurrentAddr()
                        .then(function (address) {
                            $scope.locationAddr = address;
                            $scope.locating = false;
                            return mapService.getAroundAddrs(address)   //它会作为then()的返回值
                        })
                        .then(function (addrs) {
                            $scope.aroundAddrArr = addrs;
                        });
                }
            };

            /*
             进入首页
             */
            $scope.toIndex = function (address) {
                var addr = {
                    name : address.address || address.name,
                    lat : address.lat,
                    lng : address.lng
                };
                storageUtil.session.setItem(storageUtil.KEYS.LOC_ADDR, addr);
                window.location = '#/home';
            }
        }])
})