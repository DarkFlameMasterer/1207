let { src, dest, watch } = require('gulp');
let htmlmin = require('gulp-htmlmin');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let cssnano = require('gulp-cssnano');
let concat = require('gulp-concat');
let babel = require('gulp-babel');
let imagemin = require('gulp-imagemin');

function fnCopyIndex() {
    return src('./src/index.html').pipe(dest('./dist'));
}
function fnJS() {
    return src('./src/js/*.js').pipe(babel({ presets: ['@babel/env'] })).pipe(uglify()).pipe(rename({ suffix: '.min' })).pipe(dest('./dest/js'));
}
function fnCSS() {
    return src('./src/sass/*.scss').pipe(sass()).pipe(cssnano()).pipe(rename({suffix:'.min'})).pipe(dest('./dist/css'));
}
function fnImg(){
    return src('./src/img/*').pipe(imagemin()).pipe(dest('./dist/img'));
}
function fnPage(){
    return src('./src/page/*.html').pipe(htmlmin()).pipe(dest('./dist/page'));
}
function fnWatch(){
    watch('./src/index.html',fnCopyIndex);
    watch('./src/js/*.js',fnJS);
    watch('./src/sass/*.scss',fnCSS);
    watch('./src/page/*.html',fnPage);
}
exports.fn = fnCopyIndex;
exports.js = fnJS;
exports.css = fnCSS;
exports.img = fnImg;
exports.page = fnPage;
exports.watch = fnWatch; 