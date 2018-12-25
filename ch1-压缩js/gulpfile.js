var gulp = require("gulp");
var uglify = require("gulp-uglify");
var pump = require('pump');

 
gulp.task("script",function(){
    gulp.src("js/*.js")
        //  压缩文件
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
})

// 监听文件修改，当文件被修改则执行 script 任务
gulp.task("auto",function(){
    gulp.watch("js/*.js",["script"])
})

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 script 任务和 auto 任务
gulp.task('default', ['script', 'auto']);
 

 




