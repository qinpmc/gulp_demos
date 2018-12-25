##  Gulp demos

主要参考资料：   
https://www.gulpjs.com.cn/docs/    
https://github.com/onface/gulp-book     
https://github.com/zhonglimh/Gulp    

### 1 安装gulp

- 安装cnpm （npm的国内加速镜像）    
npm install -g cnpm --registry=https://registry.npm.taobao.org

- 查看安装是否成功    
cnpm --version


- 安装gulp   
cnpm install -g gulp


### 2 调试 gulpfile.js

1. 命令行运行（此处为windows系统，node版本v8.12.0）：
node --inspect-brk ./node_modules/gulp/bin/gulp.js --verbose

2. chrome浏览器打开：
chrome://inspect

3. 找到gulpfile.js 添加断点即可

4. 补充说明：
低版本的node（Node.js 6.3+）运行命令为：
 node --inspect --debug-brk ./node_modules/gulp/bin/gulp.js export -p "taf|taf|[]|[]"
export 为命令名称， -p 为选项，"taf|taf|[]|[]" 为选项参数

高版本的命令如上1中所示。

网络说明（本人环境不可用）：
网站：https://stackoverflow.com/questions/40033298/how-to-debug-a-gulp-task
Node.js 6.3+: node --inspect --debug-brk ./node_modules/.bin/gulp css
Node.js 7+: node --inspect-brk ./node_modules/.bin/gulp css


## 压缩文件示例

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


### 注意gulp3 与gulp4 区别

（https://juejin.im/entry/582d47dca0bb9f0067a67039）
（https://gist.github.com/jeromecoupe/0b807b0c1050647eb340360902c3203a）

```
gulp3 写法
gulp.task('styles', ['clean'], function() {...});

gulp4 写法
gulp.task('scripts', gulp.series('clean', function() {...}));

gulp.task('default', gulp.parallel('scripts', 'styles'));

// default 依赖于 scripts 与 styles
gulp.task('default', gulp.series('clean', gulp.parallel('scripts', 'styles')));
```


## 编写插件

1. 创建一个package.json  
 npm init    
创建过程中，输入想要的插件名称，如prefix-plugin1  
最终的package.json如下：

```
{
  "name": "prefix-stream",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

2. 本地创建一个插件入口文件index.js文件
内容如下：

```
var through = require("through2");
module.exports = function prefix(prefix){
    if(!prefix){
        prefix = "";
    }
    var prefix = new Buffer(prefix);
    var stream = through.obj(function(file,encoding,callback){
       // 如果file类型不是buffer 退出不做处理
        if(!file.isBuffer()){
            return callback();
        }
        // 将字符串加到文件数据开头
        file.contents = Buffer.concat([prefix,file.contents]);
        // this ----> DestroyableTransform

        // 确保文件会传给下一个插件
        this.push(file);
        // 告诉stream引擎，已经处理完成
        callback();
    })
    return stream;
}
```

3. 将插件放到node_modules

在gulp项目下node_modules文件夹中创建prefix-plugin1文件夹，   
将上2步创建的 index.js 和 package.json 文件剪切到 prefix-plugin1文件夹。   


4. 使用自定义的插件   

编写gulpfile.js：

```
var gulp = require("gulp");
var prefix = require("prefix-plugin1");
gulp.task("default",function(){
    gulp.src("src/*.js")
        .pipe(prefix("prefix data-----"))
        .pipe(gulp.dest("dist/js"));
})

```

运行任务，命令行输入 gulp，即可查看编译的文件 加了前缀。


5. 针对使用 stream 方式编写插件的几个注意点

- 执行默认任务，命令行输入： gulp，出现错误：   
  TypeError: Cannot read property 'apply' of undefined   
  解决方案是全局安装下gulp-cli:     
  npm i gulp-cli -g      
  
- 再次执行默认任务，命令行输入： gulp，命令行又出现以下提示：

```
Using gulpfile E:\qinpmc\note\gulp\plugin2\gulpfile.js
[21:51:30] Starting 'default'...
[21:51:30] The following tasks did not complete: default
[21:51:30] Did you forget to signal async completion?
```


修改gulpfile.js,改为异步的

```
//原始：
gulp.task("default",function{
    gulp.src("src/*.js" ,{buffer:false})
        .pipe(prefix("prefix data-----"))
        .pipe(gulp.dest("dist/js"));
})

//改为：
gulp.task("default",async() =>{
    gulp.src("src/*.js" ,{buffer:false})
        .pipe(prefix("prefix data-----"))
        .pipe(gulp.dest("dist/js"));
})

```




 












