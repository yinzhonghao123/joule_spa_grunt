## 今日任务
1. 首页后台
2. 显示当前地址
3. 首页的轮播图功能
4. 首页的菜品列表
5. 首页的购物车功能

------------------------------------------------------------

1. 首页后台
    * banner_dao : index_banners
    * meal_dao : meals
    * db.js
    * index.js

2. 显示当前地址
	* 使用百度地图API文档(demo/类)  
	* 动态异步请求百度API接口--->得到包含百度相关类的js
	* 获取当前的经纬度point
	* 根据point进行逆地址解析得到当前地址
	* 在非angular的回调函数中, 更新scope需要使用$apply来更新页面显示
	
3. 轮播图的显示
    * 通过serverService获取轮播图数据
	* 使用swiper库 : 实现一些滑动效果的js框架
	* 视差效果: 在滑动显示页面时, 页面的内容不是同时固定显示的(swiper可以做)
	* 使用基本步骤
		* 将swiper.js/swiper.css加入项目
		* 在main.js中配置此模块
		* 创建一个Swiper对象 
			new Swiper('总div选择器', {//配置对象
				 pagination: '.swiper-pagination',   //指定页码的容器div
                 paginationClickable: true, //标识页码是否可以点击
                 autoplay: 2500, //每隔多少ms自动翻页
                 autoplayDisableOnInteraction: false, //在操作后是否停止自动翻页
                 loop : true, //是否循环翻页
                 effect: 'cube',
                 cube: {
                     shadow: false
                 }
			});
	* 解决不能滑动的问题
	    * 原因: Swiper对象创建得太早
	    * 解决: 
	        * 在获取到数据后才创建
	        * 通过setTimeout()延迟创建
4. 首页的菜品列表
    * 通过serverService获取菜品列表数据
    * 通过页面指令显示列表数据
    * 通过ng-class来控制显示样式
5. 购物车功能
    * 设计购物车cart对象的结构
        {
            meals : [],
            totalCount : 2
            totalPrice : 100
            songcanfei : 5
        }
	* cart的CRUD操作
	    * 初始化时读取session的cart, 放到scope中显示到页面
		* 当点击页面中的+/-, 更新cart, 保存到session
		* 删除item: 当数量为0时