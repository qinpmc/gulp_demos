var gulp = require("gulp");
var uglify = require("gulp-minify-css");

gulp.task("css",function(){
    gulp.src("css/*.css")
        //  压缩文件
        .pipe(uglify())
        .pipe(gulp.dest("dist/css"))
})

// 监听文件修改，当文件被修改则执行 css 任务
gulp.task("auto",function(){
    gulp.watch("css/*.css",["css"])
})

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 script 任务和 auto 任务
gulp.task("default",["css","auto"]);
