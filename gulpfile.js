const {src, dest, watch, parallel, series} = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const svgSprite = require('gulp-svg-sprite');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2'); 
// need add nunjucks or includes

function styles() {
  return src('app/scss/style.scss')
    .pipe(autoprefixer({ overrideBrowserlist: ['last 10 version']}))
    .pipe(concat('style.min.css'))
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src('app/js/main.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
}

function images() {
  return src(['app/images/src/*.*', '!app/images/src/*.svg'])
    .pipe(newer('app/images/'))
    .pipe(avif({quality: 65}))
    .pipe(src('app/images/src/*.*')) 
    .pipe(newer('app/images/'))
    .pipe(webp())
    .pipe(src('app/images/src/*.*'))
    .pipe(newer('app/images/'))
    .pipe(imagemin())
    .pipe(dest('app/images/'))
}

function sprite() {
  return src('app/images/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg',
          example: true
        }
      }
    }))
    .pipe(dest('app/images'))
}

function fonts() {
  return src('app/fonts/src/*.*')
    .pipe(fonter({
      formats: ['woff', 'ttf']
    }))
      .pipe(src('app/fonts'))
      .pipe(ttf2woff2())
      .pipe(dest('app/fonts'))
}

function watching() {
  browsersync();
  watch(['app/images/src'], images)
  watch(['app/scss/style.scss'], styles)
  watch(['app/js/main.js'], scripts)
  watch(['app/*.html']).on('change', browserSync.reload)
}

function building(){
  return src([
    'app/css/style.min.css',
    'app/images/*.*',
    '!app/images/*.svg',
    'app/images/sprite.svg',
    'app/fonts/*.*',
    'app/js/main.min.js',
    'app/*.html'
  ], {base: 'app'})
    .pipe(dest('dist'))
}

function cleanDist(){
  return src('dist').pipe(clean())
}

exports.styles = styles;
exports.images = images;
exports.fonts = fonts;
exports.scripts = scripts;
exports.watching = watching;
exports.building = building;

exports.sprite = sprite;
exports.build = series(cleanDist, building);
exports.default = parallel(styles, images, scripts, watching);