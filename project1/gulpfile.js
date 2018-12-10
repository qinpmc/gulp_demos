var gulp = require("gulp");
var gutil = require("gulp-util");
var uglify = require("gulp-uglify");
var watchPath = require("gulp-watch-path");
var combiner = require("stream-combiner2");
var sourcemaps = require('gulp-sourcemaps');
var rename = require("gulp-rename");


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


/*
gulp.task("default",function(){
    gulp.watch("src/js/!**!/!*.js",["uglify"]);
})*/




 gulp.task("default", ["watchjs","rename"]);
