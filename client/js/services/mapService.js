/**
 * Created by xfzhang on 2016/11/7.
 */
define(['app'], function (app) {
    return app.factory('mapService', ['$http', '$q',
        function ($http, $q) {
            /**
             * 加载百度地图api
             * @param containterId 显示地图的容器标签的id
             * @param callback 回调函数名
             */
            function loadMapAPI(containterId, callback) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = "http://api.map.baidu.com/api?v=2.0&ak=KM2xAiiLZnVowp1KzcNHeqSxziOXYXGL&callback="+callback;
                document.getElementById(containterId).appendChild(script);
            }

            /**
             * 得到附近的地址列表
             * @param point
             */
            function getAroundAddrs(point) {
                var defer = $q.defer();
                var url = 'http://api.map.baidu.com/geocoder/v2/?' +
                    'ak=yRrFVK2roUIGRlpcsv7pueLjvU7xO9FE&callback=JSON_CALLBACK' +
                    '&location='+point.lat+','+point.lng+'&output=json&pois=1';
                $http.jsonp(url)
                    .success(function (data) {
                        var result = data.result;
                        var cityId = result.cityCode;
                        var mapAddrs = [];
                        result.pois.forEach(function (item) {
                            var address = item.name;
                            var lng = item.point.x;
                            var lat = item.point.y;
                            mapAddrs.push({
                                address : address,
                                lng : lng,
                                lat : lat,
                                cityId : cityId
                            })
                        })
                        defer.resolve(mapAddrs);
                    })
                    .error(function () {
                        alert('请求地图地址失败!');
                    })
                return defer.promise;
            }

            /**
             * 根据地址名称得到对应的坐标点
             * @param addr
             */
            function getPointByAddr(addr) {
                var defer = $q.defer();
                var url = 'http://api.map.baidu.com/geocoder/v2/?' +
                    'address=北京'+addr+'&output=json&ak=yRrFVK2roUIGRlpcsv7pueLjvU7xO9FE&callback=JSON_CALLBACK';
                $http.jsonp(url)
                    .success(function (data) {
                        console.log(data);
                        var location = data.result.location;
                        var point = new BMap.Point(location.lng, location.lat);
                        defer.resolve(point);
                    })
                    .error(function () {
                        alert('请求地图地址失败!');
                    })
                return defer.promise;
            }

            /**
             * 得到当前的地址
             * @returns {Promise}
             */
            function getCurrentAddr() {
                var defer = $q.defer();
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() === BMAP_STATUS_SUCCESS){
                        //alert('您的位置：'+r.point.lng+','+r.point.lat);
                        var point = r.point;

                        var geoc = new BMap.Geocoder();

                        geoc.getLocation(point, function(rs){
                            var addComp = rs.addressComponents;
                            alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                            var name = addComp.city + addComp.district+addComp.street+addComp.streetNumber;
                            defer.resolve({
                                name : name,
                                lng : point.lng,
                                lat : point.lat
                            });
                        });
                    } else {
                       alert('定位失败')
                    }
                },{enableHighAccuracy: true})

                return defer.promise;
            }

            /**
             * 得到相关地址列表
             * @param address
             * @returns {Promise}
             */
            function getPlaceAddrs(address) {
                var def = $q.defer();
                var url = 'http://api.map.baidu.com/place/v2/search?q='+
                    address+'&region=北京&output=json&ak=yRrFVK2roUIGRlpcsv7pueLjvU7xO9FE'+
                    '&callback=JSON_CALLBACK';
                $http.jsonp(url)
                    .success(function (data) {
                        var placeAddrArr = [];
                        data.results.forEach(function (item) {
                            placeAddrArr.push({
                                name : item.name,
                                lat : item.location.lat,
                                lng : item.location.lng
                            });
                        });
                        def.resolve(placeAddrArr);
                    })
                    .error(function () {
                        alert('请求相关地址列表失败');
                    });
                return def.promise;
            }

            return {
                loadMapAPI : loadMapAPI,
                getAroundAddrs : getAroundAddrs,
                getPointByAddr : getPointByAddr,
                getCurrentAddr : getCurrentAddr,
                getPlaceAddrs : getPlaceAddrs
            };
        }]);
})