var gulp = require("gulp");
var prefix = require("prefix-stream");
gulp.task("default",async() =>{
    gulp.src("src/*.js" ,{buffer:false})
        .pipe(prefix("prefix data-----"))
        .pipe(gulp.dest("dist/js"));
})

/*
async() => {
    await console.log('Hello World!');
}*/
