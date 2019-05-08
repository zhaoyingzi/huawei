var gulp=require('gulp');
var minifyhtml=require('gulp-minify-html');
// gulp.task('default',function(){
//  console.log('hello')
// });

gulp.task('minhtml',function(){
    gulp.src('src/1.html')
    .pipe(minifyhtml())
    .pipe(gulp.dest("dist/"));
});
