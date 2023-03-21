const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const ghPages = require('gulp-gh-pages');

gulp.task('sass', function () {
    return gulp.src('./src/sass/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy-slick-css', function () {
    return gulp.src('./src/css/slick.css')
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('html', function () {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('images', function () {
    return gulp.src('./src/img/*')
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('icons', function () {
    return gulp.src('./src/icons/*')
        .pipe(gulp.dest('./dist/icons'));
});

gulp.task('build', gulp.series('sass', 'js', 'html', 'images', 'icons', 'copy-slick-css'));

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "src/"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on("change", browserSync.reload)
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));