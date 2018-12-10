var gulp = require("gulp");
var gutil = require("gulp-util");
var uglify = require("gulp-uglify");
var watchPath = require("gulp-watch-path");
var combiner = require("stream-combiner2");
var sourcemaps = require('gulp-sourcemaps');



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

        var paths = watchPath(event,"src/","dist/");
        //console.log(paths);
        //gutil.log(gutil.colors.green(event.type)+" "+paths.srcPath);
        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            sourcemaps.init(),
            uglify(),
            sourcemaps.write("./"),
             gulp.dest(paths.distDir)
        ])
        combined.on("error",handleError)

    })
})

/*
gulp.task("default",function(){
    gulp.watch("src/js/!**!/!*.js",["uglify"]);
})*/




 gulp.task("default", ["watchjs"]);
