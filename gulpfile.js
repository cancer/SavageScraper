var gulp = require('gulp');
var spawn = require('child_process').spawn;
var chalk = require('chalk');
var server = require('gulp-express');
var mocha = require('gulp-mocha');
var espower = require('gulp-espower');
var service = null;

var specPath = 'specs/**/*.js';
var poweredPath = 'powered/**/*.js';
var poweredDest = 'powered/';

function startServer(){
  if(service) {
    service.kill('SIGKILL');
    service = undefined;
    process.removeListener('exit', onProcessExit);
  }
  service = spawn('node', ['--harmony', 'app.js']);
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
  console.log(1)
  return gulp.src(specPath)
    .pipe(gulp.dest(poweredDest));
});

gulp.task('test', ['power-assert'], function(){
  return gulp.src(poweredPath)
    .pipe(mocha());
});

gulp.task('server', function(cb){
  gulp.watch('app.js', startServer);
  gulp.watch('modules/**/*.js', startServer);

  startServer(cb);
});

gulp.task('default', ['server']);
