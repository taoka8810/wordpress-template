const { src, dest, watch, series, parallel } = require("gulp");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const browserSync = require("browser-sync");
const imagemin = require("gulp-imagemin");

const themeName = "theme_template";

// PHPファイルのコピー
const copyPHP = () => {
  return src("./src/php/**/*.php").pipe(dest(`./wp-themes/${themeName}`));
};

// style.cssのコピー
const copyStyle = () => {
  return src("./src/style.css").pipe(dest(`./wp-themes/${themeName}`));
};

// CSSの圧縮
const compressCSS = () => {
  return src("./src/css/**/*.css")
    .pipe(plumber(notify.onError("Error: <%= error.message %>")))
    .pipe(cleanCSS())
    .pipe(rename("index.min.css"))
    .pipe(dest(`./wp-themes/${themeName}/css`));
};

// JSの圧縮
const compressJS = () => {
  return src("./src/js/**/*.js")
    .pipe(plumber(notify.onError("Error: <%= error.message %>")))
    .pipe(uglify())
    .pipe(rename("index.min.js"))
    .pipe(dest(`./wp-themes/${themeName}/js`));
};

// 画像の圧縮
const compressImage = () => {
  return src(["./src/image/**/*"])
    .pipe(plumber(notify.onError("Error: <%= error.message %>")))
    .pipe(imagemin())
    .pipe(dest(`./wp-themes/${themeName}/image`));
};

// ブラウザの設定
const browserSetting = (done) => {
  browserSync.init({
    port: 3000,
    open: true,
    notify: false,
    reloadOnRestart: true,
    files: ["src/**/*"],
    proxy: "http://localhost:8000",
  });
  done();
};

// ブラウザのリロード
const browserReload = (done) => {
  browserSync.reload();
  done();
};

// ファイルのウォッチ
const watchFile = () => {
  watch("./src/php/**/*.php", series(copyPHP, browserReload));
  watch("./src/style.css", series(copyStyle, browserReload));
  watch("./src/css/**/*.css", series(compressCSS, browserReload));
  watch("./src/js/**/*.js", series(compressJS, browserReload));
  watch("./src/image/**/*", series(compressImage, browserReload));
};

exports.default = series(
  copyPHP,
  copyStyle,
  compressCSS,
  compressJS,
  compressImage,
  parallel(browserSetting, watchFile)
);

exports.build = series(
  copyPHP,
  copyStyle,
  compressCSS,
  compressJS,
  compressImage
);
