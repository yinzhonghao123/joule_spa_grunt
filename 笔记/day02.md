## 今日任务
1. 登陆
    * 表单验证
    * 验证码功能
    * ajax请求登陆
    * 与服务器ajax交互的service模块: serverService
    * 浏览器端数据存储的工具模块: storageUtil
2. 个人中心
    * 检查是否登陆并处理
3. 意见反馈
    * ajax提交意见反馈请求

## 详情

1. 登陆
* 表单验证
    * <form>,<input>的name属性
    * 指定验证规则
    * 指定错误提示message
* 验证码功能
    * ng-click, ng-disabled ng-bind
    * 使用$interval实现倒计时
    * 更新处理逻辑
    * ajax发送验证码
        * 使用$http服务
        * 接口
            * 地址: /sendcode?phone=13716962779
            * 返回 : {"code": 0}
        * ajax请求:
            $http.get(`http://localhost:4000/sendcode?phone=${phone}`)
                    .success(result=>console.log(result))
        * 处理ajax跨域请求 : cors (服务器端)
            app.use(function(req, res, next) {
              res.set('Access-Control-Allow-Origin', '*')
              next();
            });
* ajax请求登陆
    * 接口:
        * 地址：http://localhost:4000/login
        * 请求体: phone=13716962779&code=123123
        * 返回:
            * 验证码不正确
                {
                    "code" : 1
                }
            * 登陆成功
                {
                    "code": 0,
                    "data": {
                        "phone": "13716962779",
                        "_id": "576bbe0aa1d183c42c06c08e"
                    }
                }
    * ajax请求:
        $http({
            method : 'POST',
            url : 'http://localhost:5000/login',
            data : `phone=${$scope.user.phone}&code=${$scope.user.code}`,   //跨域请求时必须自己拼参数
            headers :  {'Content-Type': 'application/x-www-form-urlencoded'} //跨域请求时才必须用
        })
        .success(function(result){
            //判断登陆是否成功, 如果不成功, 提示验证码不正确
            //如果成功
                //保存用户信息到local
                //跳转到首页
        })
        .error(function(result){
            alert(result);
        });
* 与服务器ajax交互的service模块: serverService
    * 定义模块
    * 自定义Angular服务
    * requireJS配置加载模块
    * 将所有的ajax请求处理定义成不同的功能函数, 并暴露出去
    * 使用$q的promise实现ajax的异步操作
    * controller模块中引入serverService并调用其ajax方法
* 浏览器端数据存储的工具模块: storageUtil
    * 定义模块
    * 定义session存储的相关操作
    * 定义local存储的相关操作
    * 定义标识key常量
    * 在controller模块中引入并使用
    
2. 个人中心
* 检查是否登陆并处理
    
3. 意见反馈
* ajax提交意见反馈请求