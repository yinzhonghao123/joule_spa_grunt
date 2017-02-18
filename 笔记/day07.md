## 今日任务
1. 发送短信验证码
2. 项目构建

## 详情
1. 发送短信验证码
* 使用第三方平台: 容联云通讯
    * 注册帐号并激活
    * 进入控制台, 添加测试号码
    * 得到一些信息:   
        ACCOUNT SID：8aaf070855b647ab0155b9f80994058a
        AUTH TOKEN：aa8aa679414e49df8908ea5b3d043c24 （APP TOKEN 请到应用管理中获取）
        Rest URL(生产)：https://app.cloopen.com:8883
        AppID(默认)：8aaf070855b647ab0155b9f809f90590
    * 使用短信验证码接口
        * 参照API文档编码
        * 引入并使用第三方工具包(github)
        * 在github上查找第三方库: md5/base64/request/moment
2. 项目构建
* 理解
    * 项目构建: 对你编码的源代码(html/css(less/sass)/js/image)进行一些处理: 
        * 合并
        * 压缩
        * 编译
        * 语法检查
        * 文件拷贝/清理
        * 监视: 当我们修改源代码时, 工具会自动重新构建-->自动刷新页面
    * 构建工具: 能帮我们做构建项目工作的工具
        * 能高效, 自动的完成项目构建的工作
    * 使用构建工具: 参考文档做+百度
        * 下载相关包(核心库和扩展插件库) 
        * 配置
        * 运行命令
* Grunt
    * 前端项目构建的工具
    * 基于Node
    * 任务运行器: 针对谁做什么处理的工作
    * 常用的插件:
            * grunt-contrib-clean——清除文件(打包处理生成的)
            * grunt-contrib-concat——合并多个文件的代码到一个文件中
            * grunt-contrib-uglify——压缩js文件
            * grunt-contrib-jshint——javascript语法错误检查；
            * grunt-contrib-cssmin——压缩/合并css文件
            * grunt-contrib-htmlmin——压缩html文件
            * grunt-contrib-imagemin——压缩图片文件(无损)
            * grunt-contrib-copy——复制文件、文件夹
            * `grunt-contrib-requirejs`——合并压缩requirejs管理的所有js模块文件
            * grunt-contrib-watch——实时监控文件变化、调用相应的任务重新执行
    * Gruntfile的基本配置
        module.exports = function(grunt){
            //1. 初始化插件配置
            grunt.initConfig({
                //主要编码处
                clean : ['build/css', 'build/js']
            });
            //2. 加载插件任务
            grunt.loadNpmTasks('grunt-contrib-clean')
            //3. 注册构建任务
            grunt.registerTask('default', ['clean']);
        };
* gulp
    * 功能与grunt一致
    * 比grunt打包更快
    * 相关插件:
        * gulp-concat : 合并文件(js/css)
        * gulp-uglify : 压缩js文件
        * gulp-rename : 文件重命名
        * gulp-less : 编译less
        * gulp-clean-css : 压缩css
        * gulp-livereload : 实时自动编译刷新
    * gulpfile的基本配置
        //引入gulp模块
        var gulp = require('gulp');
        var less = require('gulp-less')
        //定义默认任务
         gulp.task('lessTask', function () {
            gulp.src('src/less/*.less')
                .pipe(less())
                .pipe(gulp.dest('src/css'));
        })
        
        gulp.task('default', ['lessTask'])
    * 如何顺序执行2个任务   
        1. 定义的task要有return
        2. 后面执行的task指定依赖前一个task

* 使用grunt构建我们的订餐项目
    * 下载grunt相当的包
    * Gruntfile的配置
        * requirejs : 打包requirejs管理的所有模块
        * cssmin : 压缩css
        * htmlmin : 压缩html
        * imagemin : (无损)压缩图片
        * filecopy : 拷贝文件
        * clean : 清除打包文件
        * watch : 监视
    * 让node识别打包文件build, 而不是源码文件夹public