var gulp = require('gulp');
var path = require('path');
var del = require('del');
var spawn = require('child_process').spawn;
var chalk = require('chalk');
var server = require('gulp-express');
var babel = require('gulp-babel');
var mocha = require('gulp-mocha');
var espower = require('gulp-espower');
var service = null;

var docroot = path.resolve(__dirname, '/dist');
var scriptsPaths = ['app/script/**/*.js'];
var staticPaths = ['app/static/**/*'];
var specPath = 'specs/**/*.js';
var poweredPath = 'powered/**/*.js';
var poweredDest = 'powered/';

function startServer(){
  if(service) {
    service.kill('SIGKILL');
    service = undefined;
    process.removeListener('exit', onProcessExit);
  }
  service = spawn('node', ['dist/app.js']);
  service.stdout.setEncoding('utf8');
  service.stderr.setEncoding('utf8');
  service.stdout.on('data', log);
  service.stderr.on('data', log);
  service.on('exit', function(code, sig){
    console.log(chalk.blue('Service process exited with code', code, sig));
  });
  process.on('exit', onProcessExit);

  function log(data){
    console.log(data.trim());
  }

  function onProcessExit(){
    service.kill();
  }
}

gulp.task('power-assert', function(){
  return gulp.src(specPath)
    .pipe(babel())
    .pipe(espower())
    .pipe(gulp.dest(poweredDest));
});

gulp.task('test', ['build', 'power-assert'], function(){
  return gulp.src(poweredPath)
    .pipe(mocha({
      reporter: 'nyan'
    }));
});

gulp.task('clean', function(cb){
  del(docroot, { force: true }, cb)
})

gulp.task('scripts', function() {
  return gulp.src(scriptsPaths)
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('static', function() {
  return gulp.src(staticPaths)
    .pipe(gulp.dest('dist/static'));
});

gulp.task('build', ['clean', 'scripts', 'static']);

gulp.task('server', function(cb){
  gulp.watch('app/script/**/*.js', function(){
    gulp.run('scripts');
    startServer(cb);
  });
  gulp.watch('app/static/**/*', function(){
    gulp.run('static');
    startServer(cb);
  });

  startServer(cb);
});

gulp.task('default', ['build', 'server']);
