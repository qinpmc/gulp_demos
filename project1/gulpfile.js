var gulp = require("gulp");
var gutil = require("gulp-util");
var uglify = require("gulp-uglify");
var watchPath = require("gulp-watch-path");
var combiner = require("stream-combiner2");
var sourcemaps = require('gulp-sourcemaps');
var rename = require("gulp-rename");
var less = require('gulp-less');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');




var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n');
    gutil.log(colors.red('Error!'));
    gutil.log('fileName: ' + colors.red(err.fileName));
    gutil.log('lineNumber: ' + colors.red(err.lineNumber));
    gutil.log('message: ' + err.message);
    gutil.log('plugin: ' + colors.yellow(err.plugin));
}


gulp.task("color",function(){
    gutil.log("message");
    gutil.log(gutil.colors.red("error"));
    gutil.log(gutil.colors.green("message:")+"some");
})

gulp.task("uglify",function(){
    gulp.src("src/js/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
})

gulp.task("watchjs",function(){
    gulp.watch("src/js/**/*.js", function (event) {
        console.log(event);

/*        { type: 'changed',
            path: 'F:\\notes\\gulp_demos\\project1\\src\\js\\log.js' }*/

        var paths = watchPath(event,"src/","dist/");
        console.log(paths);

/*        { srcFilename: 'log.js',
            distFilename: 'log.js',
            srcPath: 'src\\js\\log.js',
            srcDir: 'src\\js',
            distPath: 'dist\\js\\log.js',
            distDir: 'dist\\js' }*/

        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            sourcemaps.init(),
            uglify(),
            //rename({suffix:".min"}),
            sourcemaps.write("./"),
            gulp.dest(paths.distDir)
        ])
        combined.on("error",handleError)

    })
})

gulp.task("rename",function(){
    gulp.watch("src/js/**/*.js", function (event) {
        var paths = watchPath(event,"src/","dist/");
        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            uglify(),
            rename({suffix:".min"}),
            gulp.dest(paths.distDir)
        ])
        combined.on("error",handleError)

    })
})

gulp.task('watchcss1', function () {
    gulp.watch('src/css/**/*.css', function (event) {
        var paths = watchPath(event, 'src/', 'dist/')

        gulp.src(paths.srcPath)
            .pipe(sourcemaps.init())
            .pipe(minifycss())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(paths.distDir))
    })
})

//在 watchcss 任务中加入 autoprefixer:
gulp.task('watchcss', function () {
    gulp.watch('src/css/**/*.css', function (event) {
        var paths = watchPath(event, 'src/', 'dist/')
		console.log(event);
        //在 watchcss 任务中加入 autoprefixer:
        gulp.src(paths.srcPath)
            .pipe(sourcemaps.init())
			.pipe(autoprefixer({
              browsers: 'last 2 versions'
            }))
            .pipe(minifycss())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(paths.distDir))
    })
})


gulp.task('watchless', function () {
    gulp.watch('src/less/**/*.less', function (event) {
        var paths = watchPath(event, 'src/less/', 'dist/css/')

		gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)
        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            sourcemaps.init(),
            less(),
            minifycss(),
            sourcemaps.write('./'),
            gulp.dest(paths.distDir)
        ])
        combined.on('error', handleError)
    })
})

gulp.task('lesscss', function () {
 var combined = combiner.obj([
            gulp.src('src/less/**/*.less'),
            sourcemaps.init(),
            //autoprefixer({
            // browsers: 'last 2 versions'
            //}),
            less(),
            minifycss(),
            sourcemaps.write('./'),
            gulp.dest('dist/css/')
        ])
        combined.on('error', handleError)
})


gulp.task('watchsass',function () {
    gulp.watch('src/sass/**/*.scss', function (event) {
        var paths = watchPath(event, 'src/sass/', 'dist/css/')

		gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)
        gulp.src(paths.srcPath)
			.pipe(sass().on('error', function (err) {
				console.error('Error!', err.message);
				}))
            .pipe(sourcemaps.init())
            .pipe(minifycss())
            //.pipe(autoprefixer({
            //  browsers: 'last 2 versions'
            //}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(paths.distDir))
    })
});

gulp.task('sasscss', function () {
        gulp.src('src/sass/**/*.scss')
		.pipe(sass().on('error', function (err) {
				console.error('Error!', err.message);
				}))
			.pipe(sourcemaps.init())
            .pipe(minifycss())
            .pipe(sourcemaps.write('./'))				
        .pipe(gulp.dest('dist/css'))
})



gulp.task('watchimage', function () {
    gulp.watch('src/images/**/*', function (event) {
        var paths = watchPath(event,'src/','dist/')

		gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)

        gulp.src(paths.srcPath)
            .pipe(imagemin({
                progressive: true
            }))
            .pipe(gulp.dest(paths.distDir))
    })
});

 
//gulp.task('imagemin', function () {
// 
//
//        gulp.src("src/images/**/*")
//            .pipe(imagemin({
//                progressive: true
//            }))
//            .pipe(gulp.dest("dist/images"))
//});
 
gulp.task('watchcopy', function () {
    gulp.watch('src/fonts/**/*.txt', function (event) {
        var paths = watchPath(event,'src/',"fontscopy")

		gutil.log('------' + paths.srcPath)
        gutil.log('******' + paths.distPath)

        gulp.src(paths.srcPath)
            .pipe(gulp.dest(paths.distDir))
    })
});



gulp.task('default', ['watchjs', 'watchcss', 'watchless', 'watchsass', 'watchimage', 'watchcopy']);
