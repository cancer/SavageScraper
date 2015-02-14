var gulp = require('gulp');
var exec = require('child_process').exec;
var chalk = require('chalk');

gulp.task('exec', function(){
  exec('node app.js', function(error, stdout, stderr){
    console.log(stdout);
    console.log(chalk.red(stderr));
  });
});

gulp.task('default', function(){
  gulp.watch('app.js', ['exec']);
});
