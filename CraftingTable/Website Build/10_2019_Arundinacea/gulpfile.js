var gulp         = require("gulp");
var browserSync  = require("browser-sync");
var sass         = require("gulp-sass");
var pug          = require('gulp-pug');

gulp.task('sass', function () {
    return gulp.src([
        './serve/sass/**/*.scss',
    ])
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function(){
    return gulp.src("./serve/js/*.js")
    .pipe(gulp.dest("./public/js"));
});

gulp.task('pug', function buildHTML() {
  return gulp.src('./serve/pug/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./public'));
});

gulp.task("serve",function(){
    browserSync.init({
        server: {
            baseDir: "./public/"
        }
    })
    
    // gulp.watch('./serve/sass/**/*.scss', gulp.series('sass')).on("change",browserSync.reload);
    // gulp.watch('./serve/js/**/*.js', gulp.series('js')).on("change",browserSync.reload);
    // gulp.watch("./serve/pug/**/*.pug", gulp.series('pug'));
    

    gulp.watch('./serve/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('./serve/js/**/*.js', gulp.series('js'));
    gulp.watch("./serve/pug/**/*.pug", gulp.series('pug'));
    gulp.watch("./template/**/*.pug", gulp.series('pug'));

    gulp.watch("./serve/js/*.js").on("change",browserSync.reload);
    gulp.watch("./public/css/*.css").on("change",browserSync.reload);
    gulp.watch("./public/*.html").on("change",browserSync.reload);
});