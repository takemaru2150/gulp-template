var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var mqpacker = require("css-mqpacker");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssdeclsort = require("css-declaration-sorter");

gulp.task("sass", function() {
  return (
    gulp
      .src("./assets/sass/**/*.scss")
      .pipe(
        plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
      )
      .pipe(sass({ outputStyle: "expanded" }))
      .pipe(
        postcss([
          autoprefixer({
            grid: true,
            cascade: false
          }),
          cssdeclsort({ order: "concentric-css" }),
          mqpacker()
        ])
      )
      .pipe(gulp.dest("./"))
  );
});

gulp.task("watch", function() {
  gulp.watch("./assets/sass/**/*.scss", gulp.task("sass"));
});

gulp.task("default", gulp.task("watch"));
