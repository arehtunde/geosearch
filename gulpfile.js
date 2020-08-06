const { src, dest, watch, series, parallel } = require ('gulp');
const autoprefixer = require('gulp-autoprefixer');
//const cssnano = require('gulp-cssnano');
//const postcss = require('gulp-postcss');
//const sequence = require('gulp-sequence');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const replace = require('gulp-replace');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();

//files path
const files = {
  htmlPath: './*.html',
  cssPath: 'src/*.css',
  jsPath: 'src/*.js'
}

//process Task
const htmlTask = () => {
  return src(files.htmlPath)
  .pipe(dest('dist'));
};

const cssTask = () => {
  return src(files.cssPath)
  //.pipe(postcss([autoprefixer(), cssnano()]))
  .pipe(autoprefixer())
  //.pipe(cssnano())
  .pipe(dest('dist'))
  .pipe(browserSync.stream());
};

const jsTask = () => {
  return src(files.jsPath)
  .pipe(terser())
  .pipe(
    babel({
    presets: ['@babel/env']
    })
  )
  .pipe(dest('dist'))
  .pipe(browserSync.stream());
};

const cacheBustTask = () => {
  let cbString = new Date().getTime();
  return src(['index.html'])
      .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
      .pipe(dest('.'));
};

const sync = () => {
  browserSync.init({
    port: 8080,
    server: {
      baseDir: './',
      index: '/index.html'
    }
  });
  watch(files.cssPath, cssTask);
  watch(files.htmlPath).on('change', browserSync.reload);
  watch(files.jsPath).on('change', browserSync.reload);
};

/*const watchTask = () => {
  watch([files.cssPath, files.jsPath], 
    //{interval: 1000, usePolling: true},
    series(
      parallel(htmlTask, cssTask, jsTask)
    )
  );
};*/

//exports.watch = watchTask;
//exports.serve = parallel(sync, watchTask);
exports.default = series(
  parallel(htmlTask, cssTask, jsTask),
  cacheBustTask,
  sync,
  //watchTask,
);