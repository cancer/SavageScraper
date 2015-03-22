// modules
var gulp        = require('gulp');
var babel       = require('gulp-babel');

var path        = require('path');
var del         = require('del');
var spawn       = require('child_process').spawn;
var chalk       = require('chalk');
var server      = require('gulp-express');
var mocha       = require('gulp-mocha');
var espower     = require('gulp-espower');

var browserSync = require('browser-sync');
var stubcell    = require('gulp-stubcell');
var fs          = require('fs');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var babelify    = require('babelify');


// server
var service = null;


// paths
var docroot = path.resolve(__dirname, '/dist');
var scriptsPaths = {
  server: ['./app/server/**/*.js'],
  front:  ['./app/front/scripts/**/*.js']
};
var staticPaths = ['app/static/**/*'];
var specPath = 'specs/**/*.js';
var poweredPath = 'powered/**/*.js';
var poweredDest = 'powered/';


// tasks
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

gulp.task('scripts:server', function() {
  return gulp.src(scriptsPaths.server)
    .pipe(babel())
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('scripts:front', function(){
  browserify({ debug: true })
    .transform('babelify')
    .require('./app/front/scripts/app.js', { entry: true })
    .bundle()
    .on('error', function(err){ console.log(chalk.red("Error : " + err.message)); })
    .pipe(source('app.js'))
    .pipe(gulp.dest('dist/htdocs/scripts'));
});

gulp.task('static:index', function(){
  return gulp.src('./app/front/index.html')
    .pipe(gulp.dest('dist/htdocs'));
});

gulp.task('static', ['static:index'], function() {
  return gulp.src(staticPaths)
    .pipe(gulp.dest('dist/htdocs/static'));
});

gulp.task('build', ['clean', 'scripts:server', 'scripts:front', 'static']);

gulp.task('server', function(cb){
  gulp.watch(scriptsPaths.server, function(){
    gulp.run('scripts:server');
    startServer(cb);
  });
  gulp.watch(scriptsPaths.front, function(){
    gulp.run('scripts:front');
    startServer(cb);
  });
  gulp.watch('app/static/**/*', function(){
    gulp.run('static');
    startServer(cb);
  });

  startServer(cb);
});

gulp.task('server:front', function(){
  browserSync({
    server: {
      baseDir: './dist/htdocs/',
      directory: true
    }
  });

  stubcell.start({
    entry: 'app/apimock/entry.yml',
    port: 3002
  });

  gulp.watch(scriptsPaths.front, ['scripts:front', browserSync.reload]);
  gulp.watch('app/front/index.html', ['static', browserSync.reload]);
});

gulp.task('default', ['build', 'server']);
gulp.task('front',   ['build', 'server:front'])


function startServer(){
  if(service) {
    service.kill('SIGKILL');
    service = undefined;
    process.removeListener('exit', onProcessExit);
  }
  service = spawn('node', ['dist/scripts/app.js']);
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

