/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import del from 'del';
import eslint from 'gulp-eslint';
import { Server } from 'karma';

const paths = {
  srcDir: 'src/**/*.js',
  gulpFile: 'gulpfile.babel.js',
  distDir: 'dist',
  testsDir: 'test/**/*.spec.js',
  karmaConfigFile: `${__dirname}/karma.conf.js`,
};

gulp.task('clean', () => del(paths.distDir));

gulp.task('lint', () =>
  gulp.src([paths.srcDir, paths.gulpFile, paths.testsDir])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('build', ['lint', 'clean'], () =>
  gulp.src(paths.srcDir)
    .pipe(babel())
    .pipe(gulp.dest(paths.distDir))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.distDir))
);

gulp.task('watch', () => {
  gulp.watch(paths.srcDir, ['default']);
});

gulp.task('test', done =>
  new Server({
    configFile: paths.karmaConfigFile,
    singleRun: true,
  }, done).start()
);

gulp.task('tdd', done =>
  new Server({
    configFile: paths.karmaConfigFile,
    singleRun: false,
  }, done).start()
);

gulp.task('default', ['watch', 'build']);
