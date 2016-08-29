const gulp = require('gulp');
const webpack = require('webpack');
const gutil = require('gulp-util');
const webpackConfig = require('./config/webpack.config.js');
const webpackConfigDev = require('./config/webpack-dev.config.js');
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

gulp.task('webpack-dev', function(callback) {
    const compiler = webpack(webpackConfigDev);
    compiler.watch({
        aggregateTimeout: 300
    },function(err, stats) {
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            chunks: false,
            color: true
        }));
        callback();
    });
});

gulp.task('watch-client', function() {
    gulp.run('static');
    gulp.run('webpack-dev');

    gulp.watch(['client/static/**/*'], function() {
        gulp.run('static');
    });

    gulp.watch(['client/js/**/*'], function() {
        gulp.run('webpack-dev');
    });
});

gulp.task('watch-server', function() {
    gulp.run('start-server');

    gulp.watch(['server/**/*.js'], function() {
        gutil.log('Reloading server...');
        gulp.run('start-server');
    })
});

gulp.task('start-server', function() {
    if(node) {
        node.kill();
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

gulp.task('dev', ['watch-client', 'watch-server']);

gulp.task('clean', function() {
    return del([
        'dist/**'
    ]);
});