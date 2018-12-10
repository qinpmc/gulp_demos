var gulp = require("gulp");
var prefix = require("prefix-plugin1");
gulp.task("default",function(){
    gulp.src("src/*.js")
        .pipe(prefix("prefix data-----"))
        .pipe(gulp.dest("dist/js"));
})
