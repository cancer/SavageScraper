var gulp = require('gulp');
var exec = require('child_process').exec;
var chalk = require('chalk');
var server = require('gulp-express');

gulp.task('exec', function(){
  exec('node app.js', function(error, stdout, stderr){
    console.log(stdout);
    console.log(chalk.red(stderr));
  });
});

gulp.task('server', function(){
  server.run({
    file: 'app.js'
  });
});

gulp.task('watch', function(){
  gulp.watch('**/*.js', server.run);
});

gulp.task('default', ['server', 'watch']);
