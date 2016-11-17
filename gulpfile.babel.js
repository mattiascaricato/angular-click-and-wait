/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import eslint from 'gulp-eslint';

const paths = {
  srcDir: 'src/**/*.js',
  gulpFile: 'gulpfile.babel.js',
  distDir: 'dist',
  testsDir: 'test/**/*.spec.js',
};

gulp.task('clean', () => del(paths.distDir));

gulp.task('lint', () =>
  gulp.src([paths.srcDir, paths.gulpFile])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('build', ['lint', 'clean'], () =>
  gulp.src(paths.srcDir)
    .pipe(babel())
    .pipe(gulp.dest(paths.distDir))
);

gulp.task('watch', () => {
  gulp.watch(paths.srcDir, ['default']);
});

gulp.task('test', ['build'], () => {
  gulp.src(paths.testsDir)
    .pipe(mocha())
});

gulp.task('default', ['watch', 'build']);
