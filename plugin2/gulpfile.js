var gulp = require("gulp");
var prefix = require("prefix-stream");
gulp.task("default",function(){
    gulp.src("src/*.js")
        .pipe(prefix("prefix data-----"))
        .pipe(gulp.dest("dist/js"));
})
