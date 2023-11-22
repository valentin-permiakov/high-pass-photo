const { src, dest, series, watch } = require('gulp');
const pug = require('gulp-pug');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
const autoPrefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const imageMin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const sourceMaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const del = require('del');
const mode = require('gulp-mode')({ modes: ['prod', 'dev'], default: 'dev' });

const clean = () => {
  return del(['dist']);
};

const resources = () => {
  return src('src/resources/**/*.*').pipe(dest('dist'));
};

const styles = () => {
  return src('src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(mode.dev(sourceMaps.init()))
    .pipe(concat('main.css'))
    .pipe(
      autoPrefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCss({
        level: 2,
      })
    )
    .pipe(mode.dev(sourceMaps.write()))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

const htmlMinify = () => {
  return src('src/**/*.pug')
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(
      mode.prod(
        htmlMin({
          collapseWhitespace: true,
        })
      )
    )
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

const svgSprites = () => {
  return src('src/img/svg/**/*.svg')
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: '../sprite.svg',
          },
        },
      })
    )
    .pipe(dest('dist/img'))
    .pipe(browserSync.stream());
};

const images = () => {
  return src([
    'src/img/**/*.jpg',
    'src/img/**/*.jpeg',
    'src/img/**/*.png',
    'src/img/*.svg',
  ])
    .pipe(imageMin([imageMin.mozjpeg({ quality: 75, progressive: true })]))
    .pipe(dest('dist/img'))
    .pipe(browserSync.stream());
};

const scripts = () => {
  return src(['src/js/*.js'])
    .pipe(mode.dev(sourceMaps.init()))
    .pipe(
      mode.prod(
        babel({
          presets: ['@babel/env'],
        })
      )
    )
    .pipe(concat('app.js'))
    .pipe(mode.prod(uglify().on('error', notify.onError())))
    .pipe(mode.dev(sourceMaps.write()))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
    open: false,
  });
};

watch('src/**/*.pug', htmlMinify);
watch('src/styles/**/*.scss', styles);
watch('src/img/svg/**/*.svg', svgSprites);
watch('src/js/**/*.js', scripts);
watch('src/resources/**', resources);

exports.styles = styles;
exports.htmlMinify = htmlMinify;
exports.scripts = scripts;
exports.default = series(
  clean,
  resources,
  htmlMinify,
  scripts,
  styles,
  images,
  svgSprites,
  watchFiles
);
