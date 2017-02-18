define(['app', 'storageUtil'], function (app, storageUtil) {
    return app.controller('ChooseCoordinateCtrl', ['$scope', '$rootScope', '$http', 'mapService',
        function ($scope, $rootScope, $http, mapService) {
            $rootScope.appTitle = '地图选择地址'

            mapService.loadMapAPI('mapDiv', 'init');

            var inputAddress = storageUtil.session.getItem(storageUtil.KEYS.INPUT_ADDR);

            var map;
            //添加全局函数
            window.init = function () {
                map = new BMap.Map("cc_map");            // 创建Map实例

                var lng = "116.404";
                var lat = "39.915";

                if(inputAddress!=null && inputAddress.lng) {
                    lng = inputAddress.lng;
                    lat = inputAddress.lat;
                }

                var point = new BMap.Point(lng, lat); // 创建点坐标
                map.centerAndZoom(point,15);
                map.setCurrentCity("北京");

                //监听
                    //拖拽结束
                map.addEventListener("dragend", showList);
                    //缩放结束
                map.addEventListener("zoomend", showList);

                //初始显示列表
                showList();
            }

            function showList() {
                //alert('showList');
                //得到中心点坐标对象
                var cPoint = map.getCenter();
                //根据cPoint得到附近的多个地址的列表
                mapService.getAroundAddrs(cPoint)
                    .then(function (mapAddrs) {
                        $scope.mapAddrs = mapAddrs;
                    })
            }

            //搜索
            $scope.search = function () {
                /*
                var name = $scope.searchName;
                if(name==undefined || name.trim()=='')
                    return;
                */
                var name = $scope.searchName && $scope.searchName.trim()
                if(!!name) {
                    mapService.getPointByAddr(name)
                        .then(function (point) {
                            map.centerAndZoom(point,15);
                            showList();
                        })
                }
            }

            //选择地址
            $scope.selectAddr = function (addr) {
                if(inputAddress!=null) {
                    //保存addr
                    storageUtil.session.setItem(storageUtil.KEYS.MAP_ADDR, addr);
                    //跳转
                    window.location = '#/add_new_addr';
                } else {
                    addr.name = addr.address;
                    delete addr.address;  //删除对象中的属性
                    //保存addr
                    storageUtil.session.setItem(storageUtil.KEYS.LOC_ADDR, addr);
                    window.location = '#/home';
                }

            }
    }])
})
