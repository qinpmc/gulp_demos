##  Gulp demos

### 1 本地项目安装gulp 及插件

- 安装cnpm （npm的国内加速镜像）    
npm install -g cnpm --registry=https://registry.npm.taobao.org

- 查看安装是否成功    
cnpm --version

- 本地安装gulp   
cnpm install gulp

- 安装gulp-uglify   
cnpm install gulp-uglify


### 2 项目目录

```
├── gulpfile.js
├──  js
│	└── a.js
├──  dist
│	└── js
│		└── a.js
└── node_modules
	└── gulp-uglify
```

### 3编写gulpfile.js

```
// 获取 gulp
var gulp = require('gulp')

// 获取 uglify 模块（用于压缩 JS）
var uglify = require('gulp-uglify')

// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
gulp.task('script', function() {
    // 1. 找到文件
    gulp.src('js/*.js')
    // 2. 压缩文件
        .pipe(uglify())
    // 3. 另存压缩后的文件
        .pipe(gulp.dest('dist/js'))
})

// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 script 任务
    gulp.watch('js/*.js', ['script'])
})


// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 script 任务和 auto 任务
gulp.task('default', ['script', 'auto'])
```

### 4 运行任务
在项目目录下：   
- gulp +回车，运行 script 和 auto 任务    
 
可以单独某一个任务：     
（gulp auto，运行  auto 任务，自动监听 js/*.js 文件的修改后压缩js）。  



