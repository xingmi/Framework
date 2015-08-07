var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var debug = require('gulp-debug');
// var browserSync = require('browser-sync');
var rimraf = require('gulp-rimraf')

gulp.task('moveCss',function(){
    return gulp.src('css/*')
        .pipe(debug())
        .pipe(cssmin())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('../h5/css/'));
})


gulp.task('moveImage',['clean'],function () {
    return gulp.src('img/*')
        .pipe(debug())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('../h5/img/'));
});

gulp.task('moveFonts',function(){
    return gulp.src('fonts/*')
        .pipe(debug())
        .pipe(gulp.dest('../h5/fonts/'));
});

gulp.task('clean',function(){
    return gulp.src(['../h5/img/**/*'])
        .pipe(rimraf({force:true}))
})

gulp.task('move',['moveCss','moveImage','moveFonts'],function(){
    console.log("move done")
})

// gulp.task('watch',function(){
//     browserSync({
//         server: true
//     })

//     gulp.watch(['css/**/*','js/**/*','html/**/*'],function(file){
//         browserSync.reload();
//     })
// })

