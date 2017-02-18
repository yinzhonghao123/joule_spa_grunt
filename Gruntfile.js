/**
 * 此配置文件本质就是一个node函数模块
 */
module.exports = function (grunt) {
  //1. 初始化插件配置
  grunt.initConfig({

    //清除文件的任务
    clean: ["build/css", "build/js", "build/index.html"],

    //打包requirejs管理的所有模块的任务
    requirejs: {
      compile: {
        options: {
          name: 'main',    //主配置文件名字(不能带后缀)
          mainConfigFile: 'client/js/main.js',    //require的主文件路径
          out: 'build/js/main.js'            //压缩后的文件
        }
      }
    },

    //批量、无损压缩图片的任务
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3 //定义 PNG 图片优化水平
        },
        files: [{
          expand: true, // 设置为true，表示要支持cwd等更多配置
          cwd: 'client/img/', //基本路径(只针对src有效, 对dest无效)
          src: ['*.{png,jpg,jpeg,gif}'], // 优化目录下所有png/jpg/jpeg/gif图片
          dest: 'build/img/' // 优化后的图片保存位置
        }]
      }
    },

    //js语法检查的任务
    jshint: {
      options: {
        jshintrc: '.jshintrc' //语法检查的配置文件
      },
      files: ['Gruntfile.js', 'client/js/**/*.js', '!client/js/libs/*.js'] //检查哪些文件
    },

    //合并压缩css的任务
    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: 'client/css/templates',
            src: ['*.css'],
            dest: 'build/css/templates'
          },
          {
            //输出文件: 被所有被处理文件的数组
            'build/css/output.min.css': [
              'client/css/*.css',
              '!client/css/swiper.min.css'
            ]
          }
        ]
      }
    },

    //压缩html页面的任务
    htmlmin: {
      dist: {
        options: {
          removeComments: true,  //删除注释
          collapseWhitespace: true //合并多行空行
        },
        files: [
          {
            expand: true, // 设置为true,表示要支持cwd等更多配置项
            cwd: 'client/js/templates/', //基础目录
            src: ['*.html'], //将要被压缩的所有文件的数组
            dest: 'build/js/templates' //输出目标文件夹
          },
          {
            expand: true,
            cwd: 'client/',
            src: ['index.html'],
            dest: 'build/'
          }
        ]
      }
    },

    //拷贝文件的任务
    copy: {
      main: {
        //将不需要处理的文件直接从源目录拷贝到目标目录中
        files: [
          {
            src: ['client/js/libs/require.min.js'],
            dest: 'build/js/require.min.js'
          },
          {
            src: ['client/css/swiper.min.css'],
            dest: 'build/css/swiper.min.css'
          }
        ],
      },
    },

    //监视
    watch: {
      scripts: {
        files: ['client/js/templates/*.html', 'client/js/**/*.js',
          '!client/js/libs/*.js', 'client/css/*.css'],
        tasks: ['requirejs', 'cssmin', 'htmlmin'],
        options: {spawn: false} //增量更新, 默认为true表示全量更新
      }
    },
  });

  //2. 加载插件任务
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //3. 注册构建任务
  grunt.registerTask('dev',
    ['jshint', 'clean', 'requirejs', 'imagemin',
      'cssmin', 'htmlmin', 'copy', 'watch']);
};