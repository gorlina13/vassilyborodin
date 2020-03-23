"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var del = require("del");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var pipeline = require("readable-stream").pipeline;
var sourcemaps = require("gulp-sourcemaps");
var gulpIf = require("gulp-if");
var ghPages = require('gh-pages');

var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == "development";

function style() {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
}

function clean() {
  return del("build");
}

function copy() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/*.png",
    "source/*.webmanifest"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
}

function sprite() {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

function html() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

function js() {
  return pipeline(
    gulp.src("source/js/**/*.js"),
    gulpIf(isDevelopment, sourcemaps.init()),
    uglify(),
    rename(function (path) {
      path.basename += ".min";
    }),
    gulpIf(isDevelopment, sourcemaps.write()),
    gulp.dest("build/js")
  );
}

function webmanifest() {
  return gulp.src("source/*.webmanifest")
    .pipe(gulp.dest("build"));
}

function serve(done) {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  done();
}

function reload(done) {
  server.reload();
  done();
}

function watch() {
  gulp.watch("source/sass/**/*.{scss,sass}", style);
  gulp.watch("source/*.html", gulp.series(html, reload));
  gulp.watch("source/js/**/*.js", gulp.series(js, reload));
  gulp.watch("source/*.webmanifest", gulp.series(webmanifest, reload));
}

function deploy(done) {
  ghPages.publish("build", {
    branch: "master",
    repo: "git@vassilyborodin.github.com:vassilyborodin/vassilyborodin.github.io.git",
    remote: "site"
  }, done);
}

exports.style = style;
exports.clean = clean;
exports.copy = copy;
exports.sprite = sprite;
exports.html = html;
exports.js = js;
exports.default = gulp.series(
  clean,
  gulp.parallel(
    copy,
    style
  ),
  sprite,
  gulp.parallel(
    html,
    js
  )
);
exports.dev = gulp.series(serve, watch);
exports.deploy = deploy;
