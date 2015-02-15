var gulp = require('gulp');
var spawn = require('child_process').spawn;
var chalk = require('chalk');
var server = require('gulp-express');
var service = null;

gulp.task('exec', function(){
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
});

gulp.task('watch', function(){
  gulp.watch('app.js', ['exec']);
  gulp.watch('modules/**/*.js', ['exec']);
});

gulp.task('default', ['exec', 'watch']);
