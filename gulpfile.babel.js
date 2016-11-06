/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import eslint from 'gulp-eslint';

const paths = {
  allSrc: 'src/**/*.js',
  gulpFile: 'gulpfile.babel.js',
  distDir: 'dist',
};

gulp.task('clean', () => del(paths.distDir));

gulp.task('lint', () =>
  gulp.src([paths.allSrc, paths.gulpFile])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('build', ['lint', 'clean'], () =>
  gulp.src(paths.allSrc)
    .pipe(babel())
    .pipe(gulp.dest(paths.distDir))
);

gulp.task('watch', () => {
  gulp.watch(paths.allSrc, ['default']);
});

gulp.task('default', ['watch', 'build']);
