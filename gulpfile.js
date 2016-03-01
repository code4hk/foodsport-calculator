var fs = require('fs');
var join = require('path').join;
var child = require('child_process');

var gulp = require('gulp');
var gutil = require('gulp-util');
var changed = require('gulp-changed');
// var notify = require('gulp-notify');
// var nodemon = require('gulp-nodemon');
// var sass = require('gulp-sass');
// var browserSync = require('browser-sync');
// var file = require('gulp-file');
var WebpackDevServer = require("webpack-dev-server");
var webpack = require('webpack');
var ghPages = require('gulp-gh-pages');

var DIST = 'dist';

var webpackConfig = require('./webpack.config.js');
//
gulp.task("webpack", function(callback) {
    // run webpack
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var compiler = webpack(webpackConfig);

    new WebpackDevServer(compiler, {
        // server and middleware options
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]");

        // keep the server alive or continue?
        // callback();
    });
});


///////////////////////////////////////////////////////////
// helper

/**
 * NOTE:
 *
 * files are removed in parallel
 *
 * If there are no error, callback will only be called once.
 *
 * If there are multiple errors, callback will be called
 * exactly as many time as errors occur. (and no final callback)
 *
 * Sometimes, this behavior maybe useful, but users
 * should be aware of this and handle error in callback.
 *
 */
//
// function rmfile(dir, file, callback){
//   var p = join(dir, file);
//   fs.lstat(p, function(err, stat){
//     if(err) callback.call(null,err);
//     else if(stat.isDirectory()) rmdir(p, callback);
//     else fs.unlink(p, callback)
//   })
// }
//
// function rmdir(dir, callback){
//   fs.readdir(dir, function(err,files){
//     if(err) callback.call(null,err);
//     else if( files.length ){
//       var i,j;
//       for(i=j=files.length; i--; ){
//         rmfile(dir,files[i], function(err){
//           if(err) callback.call(null, err);
//           else if(--j === 0 ) fs.rmdir(dir,callback)
//         })
//       }
//     }
//     else fs.rmdir(dir, callback)
//   })
// }
//
// ///////////////////////////////////////////////////////////
// // tasks
// //
gulp.task('copy', function(){
  gulp.src('./img/**')
    .pipe(changed(DIST+'/img'))
    .pipe(gulp.dest(DIST+'/img'))

});
//
gulp.task('deploy',['build'], function() {
 return gulp.src(DIST+'/**/*')
    // .pipe(file('CNAME', 'hike.code4.hk'))
   .pipe(ghPages({
    //  cname:"hike.code4.hk"
   }));
});
//
// gulp.task('scss', function () {
//   gulp.src('./src/scss/index.scss')
//     .pipe(sass().on('error', gutil.log))
//     .pipe(gulp.dest('www/css'))
//     .pipe(notify('scss: <%= file.relative %>'));
// });
//
//
// var reload = browserSync.reload;
// gulp.task('browserSync', [], function(){
//   browserSync({
//     proxy: 'localhost:3000',
//     port: 3001
//   });
// });
//
// gulp.task('start', function () {
//   nodemon({
//     script: 'index.js',
//     ext: 'js',
//     watch: [],
//     ignore: ['src/jsx/*'],
//     "execMap": {
//       "js": "iojs"
//     }
//   })
// });
//
gulp.task('build', ['copy', 'webpack']);
//
// gulp.task('clean', function(done){
//   var called = false;
//   rmdir(DIST, function(err){
//     if(called) return;
//     called = true;
//     done(err);
//   });
// });
//
// ///////////////////////////////////////////////////////////
//
// gulp.task('default', ['build', 'start', 'browserSync'], function(){
//
//   // static
//   gulp.watch('src/static/**', [ 'copyStaticFiles']);
//
//   // scss
//   gulp.watch('src/scss/**', ['scss']);
//
//   // jsx
//   gulp.watch(['src/jsx/**'], [ 'webpack']);
//
//   // browser sync
//   gulp.watch('www/css/**', function(event){
//     if( event.type === 'deleted' ) reload();
//     else reload(event.path);
//   });
//   gulp.watch(['www/js/**', 'src/routes/api.js']).on('change', reload);
//
// });
