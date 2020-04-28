const gulp = require('gulp');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');

//SCSS compilation

function style() {
    return gulp.src('./assets/scss/*.scss')
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest('./assets/css'))
}

function cleanVendors(){
    return del('./assets/vendors/**/*');
}

function buildVendors() {
    var addon1 = gulp.src('./node_modules/bootstrap/**/*')
                     .pipe(gulp.dest('./assets/vendors/bootstrap'));
    var addon2 = gulp.src('./node_modules/jquery/dist/**/*')
                     .pipe(gulp.dest('./assets/vendors/jquery'));
    var addon3 = gulp.src('./node_modules/popper.js/dist/umd/**/*')
                     .pipe(gulp.dest('./assets/vendors/popper.js'));
    var addon4 = gulp.src('./node_modules/@fortawesome/fontawesome-free/**/*')
                     .pipe(gulp.dest('./assets/vendors/fontawesome-free'));

    return (addon1, addon2, addon3, addon4);
}

exports.style = style;
exports.watch = watch;
exports.buildVendors = gulp.series(cleanVendors, buildVendors);
