## 今日任务
1. 设置当前地址功能
2. 购物车动画效果
3. 下单功能
4. 短信验证功能

------------------------------------------------------------
1. 设置当前地址功能
* 通过百度地图API获取地址相关数据
    * 定位当前地址(name/lng/lat)
    * 根据当前地址的经纬度得到附近的地址列表
    * 根据地址关键字得到相关的地址列表
* 调用显示
    * 调用mapService相关的方法, 得到数据并保存到$scope中
    * 显示 : ng-repeat, ng-bind
* 显示效果
    * ng-show
    * ng-class
    
2. 购物车动画效果
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
3. 下单功能
    * 显示收货地址
    * 显示下单时间列表
    * 显示购物车数据
    * 下单请求处理
    * 显示订单详情: 使用服务端页面模版(ejs)

switch(order.state) {
    case 0:
        stateText = '待支付';
        break;
    case 1:
        stateText = '已付款';
        break;
    case 3:
        stateText = '已完成';
        break;
    case 4:
        stateText = '店铺拒单';
        break;
    case 5:
        stateText = ' 商家已接单';
        break;
    case 6:
        stateText = '已退单';
        break;
    case 7:
        stateText = '未支付的取消订单';
        break;
    case 8:
        stateText = '订单异常';
        break;
    case 9:
        stateText = '退单中';
        break;
    case 10:
        stateText = '商家拒绝退单';
}