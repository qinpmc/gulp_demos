const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

// 编译并压缩js
gulp.task('convertJS', function(){
    return gulp.src('app/js/*.js')
/*        .pipe(babel({
            presets: ['es2015']
        }))*/
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
})

// 合并并压缩css
gulp.task('convertCSS', function(){
    return gulp.src('app/css/*.css')
        .pipe(concat('app.css'))
        .pipe(cssnano())
        .pipe(rename(function(path){
            path.basename += '.min';
        }))
        .pipe(gulp.dest('dist/css'));
})

// 监视文件变化，自动执行任务
gulp.task('watch', function(){
    gulp.watch('app/css/*.css', ['convertCSS']);
    gulp.watch('app/js/!*.js', ['convertJS', 'browserify']);
})

// browserify
gulp.task("browserify", function () {
    var b = browserify({
        entries: "dist/js/app.js"
    });

    return b.bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("dist/js"));
});

gulp.task('start', [ 'convertCSS', 'watch','browserify']);

/*
gulp.task("toes5", function () {
    return gulp.src("app/js/!*.js")// ES6 源码存放的路径
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest("dist/js")); //转换成 ES5 存放的路径
});



// 自动监控任务
// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 script 任务
    gulp.watch('app/js/!**!/!*.js', ['toes5']);
    gulp.watch('app/css/!*.css', ['convertCSS']);
});*/
