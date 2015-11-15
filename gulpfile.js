var config = {
  src: './sprites/*.svg',
  dest: './source/images',
  name: 'sprites'
};


var gulp        = require('gulp')
var imagemin    = require('gulp-imagemin')
var svgstore    = require('gulp-svgstore')
var cheerio = require('gulp-cheerio')
var svg2png = require('gulp-svg2png')
var rename = require('gulp-rename')


gulp.task('svgSprite', ['svg2png'], function() { // Create fallback pngs (before modification)

  return gulp.src(config.src)
    .pipe(imagemin())
    //.pipe(cheerio({ // Remove fills for future css-control
        //run: function ($) {
            //$('[fill]').removeAttr('fill');
        //},
        //parserOptions: { xmlMode: true }
    //}))
    .pipe(svgstore())
    .pipe(rename(config.name + '.svg'))
    .pipe(gulp.dest(config.dest))
})


// https://github.com/jonathantneal/svg4everybody
gulp.task('svg2png', function() {
  return gulp.src(config.src)
    .pipe(svg2png())
    .pipe(rename({prefix: config.name + '.svg.'}))
    .pipe(gulp.dest(config.dest))
})


