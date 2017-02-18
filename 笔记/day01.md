## 今日任务
1. 搭环境
    * 下载并安装node
    * 下载并安装mongodb
    * 启动mongodb服务
    * WebStorm打开最终版项目源码工程
    * 导入项目的初始化数据库数据
    * 启动运行项目
    * 访问体验项目功能
2. 创建新项目及其整体结构
    * 创建一个node项目
    * 使用SVN对项目进行版本控制
    * 分析项目client端的整体结构设计
    * 创建client端的整体文件结构
    * 导入所有依赖的js库
3. 使用require.js实现模块化编码
    * 拆分页面
    * require的配置
    * 定义route和controller模块
    * 启动angular
    * 实现主页面与各个页面间的路由跳转

## 详情
1. 搭环境
    * 下载并安装node
        * node -v
    * 下载并安装mongodb
        * mongo --version
    * 启动mongodb服务并测试
        * win10需要单独使用bat文件启动
        * mongo : 连接数据库
        * show dbs :　显示所有的数据库
        * use atguigu_o2o : 使用某个库
        * show collections : 显示库中的所有集合(表)
        * db.users.find() : 查询集合中所有的文档(记录)
        * db.dropDatabase() : 删除指定的库
        
		* 集合collection : 多条记录的集合  相当于表, 查询得到对象的数组
		* 文档document : 一条记录, 查询得到对象
    * WebStorm打开最终版项目源码工程
        * server
            |- bin
                |- www : 项目启动文件
            |- db : 数据模块文件夹
            |- node_modules : 依赖模块
            |- public : client资源文件夹
            |- routes : 路由模块文件夹
            |- util : 工具模块文件夹
            |- views : 服务器端模板页面文件夹
            |- app.js : 项目的主js
            |- package.json : 项目应用包描述文件
        * client
            |- css : css文件夹
            |- img : 图片文件夹
            |- js
                |- libs : 库js
                |- controllers : 控制器模块js
                |- routes : 路由模块js
                |- services : 服务模块js
                |- util : 工具模块js
                |- templates : 模板html
            |- index.html : 主页面
        * 笔记文档
            |- 笔记  : 笔记文件夹
            |- 接口文档.md : 前后台交互接口文档
    * 导入项目的初始化数据库数据
        * 命令行窗口进入bin/mongoDB_data_file
        * 运行'导入数据库的命令.txt'中的所有命令: 初始化数据库数据
    * 启动运行项目
        * 命令行运行 : node bin/www
        * 工具运行 : 右键www文件run/debug
    * 访问体验项目功能
        * pc访问: 
            * 自己访问: localhost:4000
            * 他人访问: ip:4000
        * 手机访问:
            * 电脑连接外网
            * 电脑共享出一个热点
            * 手机联上电脑热点
            * 查看电脑的虚拟IP
            * 手机浏览器访问: http://ip:4000
2. 创建新项目及其整体结构
    * 创建一个node项目
        * 指定服务器端模板使用ejs
    * 使用SVN对项目进行版本控制
        * 忽略.idea和node_modules
    * 分析项目client端的整体结构设计
    * 创建client端的整体文件结构
        |- css : css文件夹, 基础css和各个模板页面都对应一个css文件
        |- img : 图片文件夹
        |- js
            |- libs : 库js
            |- controllers : 控制器模块js
            |- routes : 路由模块js
            |- services : 服务模块js
            |- util : 工具模块js
            |- templates : 模板html
        |- index.html : 主页面
    * 导入所有依赖的js库  
        * angular.js : angular核心库
        * angular-messages.js : angular表单验证插件
        * angular-route.js : angular路由插件
        * require.js : AMD模块化库
3. 使用require.js实现模块化编码
    * 拆分页面
        * js/templates/xxx.html
        * css/xxx.css
    * controller模块
        * app.js
        * XxxCtrl.js
    * route配置模块
        * $routeProvider
        * when('/home', {templateUrl: 'js/templates/home.html', controller:'HomeCtrl'})
        * otherwise('/home')
    * require的配置和引入模块
        * 配置
            * require.config({})
            * baseUrl : 基本路径
            * paths : 模块名:模块文件路径
            * shim : 非AMD模块处理
        * 引入所有模块
            * require(['模块1','模块2'], function(){})
    * 启动angular
        * angular.bootstrap(document, ['dcApp'])
    * 实现主页面与各个页面间的路由跳转
        * 路由路径: #/xxx

----------------------------------------------------------------------------------------

* 使用npm下载依赖模块
    * 常用命令:
        * npm install
        * npm install package --save
        * npm install package --save-dev
        * npm install package --g
    * 问题:
        * 下载速度慢
        * 下载不了
* 使用cnpm
    * 使用的是npm仓库的淘宝镜像
    * 配置: npm install -g cnpm --registry=https://registry.npm.taobao.org
    * 常用命令: 使用cnpm 代替npm
    * 问题:
        * 会多下载一些文件/文件夹
        * 可能会导致webstorm卡死
* 修改npm 所使用的仓库
  * 
  * 配置: npm config set registry "https://registry.npm.taobao.org"

* 使用yarn
    * yarn是facebook开源的新的包管理工具, 用来代替npm
    * 配置: npm install yarn -g
    * 常用命令: 
        * yarn --version
        * yarn
        * yarn init
        * yarn add package
        * yarn add package -dev
* 使用cyarn
	* 使用淘宝npm镜像, 更快
    * 配置: npm install -g cyarn --registry=https://registry.npm.taobao.org
    * 常用命令: 将yarn替换为cyarn