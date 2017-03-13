const gulp = require('gulp');
const webpack = require('webpack');
const gutil = require('gulp-util');
const webpackConfig = require('./config/webpack.config.js');
const del = require('del');
const spawn = require('child_process').spawn;
let node;

// Ensure all processing stops on Ctrl-C
process.once('SIGINT', function () {
    process.exit(0);
});

gulp.task('static', function() {
    return gulp.src(['client/static/**/*'], { buffer: true })
        .pipe(gulp.dest('dist'));
});

gulp.task('watch-client', ['static'], function() {
    gulp.watch(['client/static/**/*'], ['static']);

    webpack(webpackConfig(true));
});

gulp.task('watch-server', ['start-server'], function() {
    gulp.watch(['server/**/*.js'], ['start-server']);
});

gulp.task('start-server', function() {
    if(node) {
        node.kill();
        gutil.log('Reloading server...');
    }

    node = spawn('node', ['server/index.js'], {
        stdio: 'inherit',
        env: {
            PATH: process.env.PATH,
            NODE_ENV: 'development'
        }
    });

    node.on('close', function (code) {
        if (code === 8) {
            gutil.log('Error with server, waiting...');
        }
    });
});

gulp.task('build', ['watch-client', 'watch-server']);
gulp.task('dev', ['watch-server', 'watch-client']);

gulp.task('clean', function() {
    return del([
        'dist/**'
    ]);
});