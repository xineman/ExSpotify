const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const del = require('del');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
var htmlreplace = require('gulp-html-replace');
var webpack = require('webpack-stream');
var concatCss = require('gulp-concat-css');

gulp.task('default', ['watch']);

//Compile SCSS
gulp.task('sass', function() {
    return gulp.src('app/public/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/public/css'))
        // .pipe(browserSync.stream())
});

gulp.task('concat-css',['sass'], function () {
  return gulp.src(['app/client/public/css/scroll.css','app/client/public/css/font-awesome.min.css', 'app/client/public/css/master.css'])
    .pipe(concatCss("css/styles.css"))
    .pipe(gulp.dest('app/client/public/'));
});
//DEVELOPMENT

gulp.task("watch",['concat-css', 'scripts'], ()=> {
  gulp.watch("app/client/public/scss/**/*.scss", ['concat-css']);
  gulp.watch(["app/client/public/js/**/*.js","!app/client/public/js/main.js","!app/client/public/js/libs.js"], ['scripts']);
});

//Bundle scripts using webpack
gulp.task('scripts' ,function() {
  return gulp.src('app/client/public/js/common.js')
    .pipe(webpack( require('./app/webpack.config.js') ))
    .pipe(gulp.dest('app/client/public/js'));
});

//PRODUCTION
gulp.task('build', ['clean', 'index', 'min-css', 'webpack'], function() {
    gulp.src('app/client/public/img/*').pipe(gulp.dest('dist/client/public/img'));
    gulp.src('app/client/fonts/*').pipe(gulp.dest('dist/client/fonts'));
    gulp.src('app/client/*.*').pipe(gulp.dest('dist/client/'));
    gulp.src('app/server/**/*.js').pipe(gulp.dest('dist/server'));
});

gulp.task('clean', function() {
    return del.sync('dist');
});

//Bundle scripts using webpack
gulp.task('webpack' ,function() {
  return gulp.src('app/client/public/js/common.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('dist/client/public/js'));
});

//Replace CSS and JS pathes for production
gulp.task('index', () => {
  gulp.src('app/client/public/index.html')
    .pipe(htmlreplace({
      'css': 'css/styles.min.css',
      'js': ['js/libs.min.js','js/main.min.js']
    }))
    .pipe(gulp.dest('dist/client/public/'));
});

//Minify CSS
gulp.task('min-css', ['concat-css'], function() {
    return gulp.src('app/client/public/css/styles.css')
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/client/public/css'));
});

// //Transpile to ES5
// gulp.task('babel', () => {
//     return gulp.src('app/js/common.js')
//         .pipe(babel({
//             presets: ['es2015','react']
//         }))
//         .pipe(rename({
//             suffix: '-es5'
//         }))
//         .pipe(gulp.dest('app/js'));
// });
