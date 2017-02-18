## 今日任务
1. 地址模块的后台功能
2. 地址模块的前台页面功能
3. 百度地图API使用

---------------------------------------

1. 地址后台功能
    * dao_address.js
        * 引入connection.js
        * 得到mongoose对象 
        * Schema-->addressSchema
        * AddressModel
            * find()
            * findOne()
            * update()
            * remove()
        * addressModel
            * save()
    * db.js
        * 定义对应的方法
    * address.js
        * 参照API接口文档编写

2. 地址的页面功能	
    * addrManage.html
        * 地址的列表展示 : userId
        * 进入地址修改页面 : 将当前要修改的地址信息对象保存到session
        * 地址的删除 : id
    * addNewAddr.html
        * 地址添加
        * 地址修改
            * 区别是添加还是修改: session中有没有edit_addr
    * angular的一些指令: ng-repeat / ng-model /ng-click / ng-class /ng-disabled
    * 使用$http提交ajax请求进行操作/更新界面

3. 百度地图API使用
	* 注册百度帐号/激活
	* 创建虚拟应用--->AK
	* 根据demo/类说明来编写
	* jsonp跨域请求