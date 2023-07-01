const { src, dest, series, watch } = require("gulp");
const gulp = require("gulp");
const fileinclude = require("gulp-file-include");
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

function html() {
  return gulp
    .src(["*.html", "!mainHeader.html", "!nav.html", "!topHeader.html"])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("./build"));
}

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

async function buildAndReload() {
  await html();
  await styles();
  await scripts();
  await imgs();
  reload();
}

function watchTask() {
  server.init({
    server: {
      baseDir: "./build/",
    },
  });
  buildAndReload();
  watch(["./scss/**/*.scss", "*.html", "./js/**/*.js"], series(buildAndReload));
}

exports.default = series(styles, html, scripts, imgs, watchTask, reload);
