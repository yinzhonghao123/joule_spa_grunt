define(['app', 'storageUtil'], function (app, storageUtil) {
    return app.controller('AddNewAddrCtrl', ['$scope', '$rootScope', 'serverService',
        function ($scope, $rootScope, serverService) {

            //读取session中edit_addr, 依此判断是更新还保存
            var editAddr = storageUtil.session.getItem(storageUtil.KEYS.EDIT_ADDR);
            if(editAddr!=null) { //更新
                $rootScope.appTitle = '更新地址'
                $scope.address = editAddr;
            } else {//增加
                $rootScope.appTitle = '添加地址'
                //准备address对象
                $scope.address = {};
                //读取local中的user
                var user = storageUtil.local.getItem(storageUtil.KEYS.USER);
                $scope.address.userId = user._id;
            }

            //读取session中的input_addr
            var inputAddr = storageUtil.session.getItem(storageUtil.KEYS.INPUT_ADDR);
            if(inputAddr!=null) {
                $scope.address = inputAddr;
                storageUtil.session.removeItem(storageUtil.KEYS.INPUT_ADDR);
            }

            //读取session中的map_addr
            var mapAddr = storageUtil.session.getItem(storageUtil.KEYS.MAP_ADDR);
            if(mapAddr!=null) {
                $scope.address.address = mapAddr.address;
                $scope.address.cityId = mapAddr.cityId;
                $scope.address.lng = mapAddr.lng;
                $scope.address.lat = mapAddr.lat;
                storageUtil.session.removeItem(storageUtil.KEYS.MAP_ADDR);
            }

            //设置性别
            $scope.setSex = function (sex) {
                $scope.address.sex = sex;
            }

            //选择地图地址
            $scope.toAddrMap = function () {
                /*
                $scope.address.address = '龙隆昌科技楼'
                $scope.address.lat = '39.99392711698915';
                $scope.address.lng = '116.32432928208593';
                $scope.address.cityId = 113;
                */
                //保存当前address
                storageUtil.session.setItem(storageUtil.KEYS.INPUT_ADDR, $scope.address);


                window.location = '#/choose_oordinate';
            }

            //提交
            $scope.submit = function () {
                if(editAddr!=null) {
                    serverService.updateAddr($scope.address)
                        .then(function (result) {
                            console.log(result);
                            alert('修改地址成功!');
                            window.location = '#/addr_manage'
                        })
                } else {
                    serverService.addAddr($scope.address)
                        .then(function (addr) {
                            console.log(addr);
                            alert('保存地址成功!');
                            window.location = '#/addr_manage'
                        })
                }

            }
    }])
})
