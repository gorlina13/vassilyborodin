"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

function style() {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
}

function serve(cb) {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  cb();
}

function watchAll() {
  gulp.watch("source/sass/**/*.{scss,sass}", style);
  gulp.watch("source/*.html").on("change", server.reload);
}

exports.style = style;
exports.dev = gulp.series(style, serve, watchAll);
