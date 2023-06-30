const { src, dest, series, watch } = require("gulp");
const gulp = require("gulp");
const fileinclude = require("gulp-file-include");
// styles
const scss = require("gulp-sass")(require("sass"));
const autoPrefixer = require("gulp-autoprefixer");
const cssMinify = require("gulp-clean-css");
const concat = require("gulp-concat");

const server = require("browser-sync").create();

function styles() {
  return src("./scss/**/*.scss")
    .pipe(concat("all.scss"))
    .pipe(scss())
    .pipe(autoPrefixer("last 2 versions"))
    .pipe(cssMinify())
    .pipe(dest("./build/css"));
}

//html
function html() {
  return gulp
    .src([
      "*.html",
      "!header.html", // ignore
      "!nav.html", // ignore
      "!section.html", // ignore
    ])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("./build"));
}

// scripts
const jsMinify = require("gulp-terser");

function scripts() {
  return src("./js/*.js").pipe(jsMinify()).pipe(dest("./build/js"));
}

async function imgs() {
  gulp.src(["./img/**/*"]).pipe(gulp.dest("./build/img"));
}

function reload() {
  server.reload();
}

function watchTask() {
  server.init({
    server: {
      baseDir: "./build/",
    },
  });
  reload();
  watch(["./scss/**/*.scss", "*.html"], series(styles, html, imgs, scripts));
}

exports.default = series(styles, html, scripts, imgs, watchTask, reload);
