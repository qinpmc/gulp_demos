/*

// gulp 3.9.1
var gulp = require("gulp");
var miniCSS = require("gulp-minify-css");

gulp.task("css",function(){
    gulp.src("css/*.css")
        //  压缩文件
        .pipe(miniCSS())
        .pipe(gulp.dest("dist/css"))
})

// 监听文件修改，当文件被修改则执行 css 任务
gulp.task("auto",function(){
    gulp.watch("css/*.css",["css"])
})

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 script 任务和 auto 任务
gulp.task("default",["css","auto"]);

*/


// gulp 4.0
// 获取 gulp
var gulp = require('gulp')

// 获取 minify-css 模块（用于压缩 CSS）
var minifyCSS = require('gulp-clean-css')

// 压缩 css 文件
// 在命令行使用 gulp css 启动此任务
gulp.task('css', function () {
    // 1. 找到文件
    gulp.src('css/*.css')
    // 2. 压缩文件
        .pipe(minifyCSS())
    // 3. 另存为压缩文件
        .pipe(gulp.dest('dist/css'))
})

// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 css 任务
    gulp.watch('css/*.css', gulp.series("css"))
});

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 css 任务和 auto 任务
gulp.task('default',  gulp.parallel ('css', 'auto'))


